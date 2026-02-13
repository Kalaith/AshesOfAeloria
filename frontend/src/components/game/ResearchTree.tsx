import React, { useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { researchTree, getAvailableResearchNodes, calculateResearchCost } from '../../data/campaignData';
import type { ResearchNode } from '../../data/campaignData';

interface ResearchTreeProps {
  showOnlyAvailable?: boolean;
  allowResearch?: boolean;
}

export const ResearchTree: React.FC<ResearchTreeProps> = ({
  showOnlyAvailable = false,
  allowResearch = true
}) => {
  const [selectedNode, setSelectedNode] = useState<ResearchNode | null>(null);
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const gameState = useGameStore();

  const completedResearch = gameState.completedResearch || [];
  const completedChapters = gameState.completedChapters || [];
  const currentResources = {
    knowledge: gameState.knowledge || 0,
    mana: gameState.mana || 0,
    materials: gameState.materials || 0,
    culture: gameState.culture || 0,
    energy: gameState.energy || 0,
    artifacts: gameState.artifacts || 0
  };

  const availableNodes = getAvailableResearchNodes(completedResearch, completedChapters);
  const branches = [...new Set(researchTree.map(node => node.branch))];

  const filteredNodes = researchTree.filter(node => {
    if (showOnlyAvailable && !availableNodes.some(n => n.id === node.id) && !completedResearch.includes(node.id)) {
      return false;
    }
    if (filterBranch !== 'all' && node.branch !== filterBranch) {
      return false;
    }
    return true;
  });

  const canAfford = (node: ResearchNode): boolean => {
    const cost = calculateResearchCost(node);
    return Object.entries(cost).every(([resource, amount]) => {
      return (currentResources[resource as keyof typeof currentResources] || 0) >= amount;
    });
  };

  const handleResearch = (node: ResearchNode) => {
    if (!allowResearch) return;

    const isAvailable = availableNodes.some(n => n.id === node.id);
    const isCompleted = completedResearch.includes(node.id);

    if (!isAvailable || isCompleted || !canAfford(node)) return;

    // This would trigger the research action in the game store
    gameState.startResearch?.(node.id);
  };

  const renderNodeCard = (node: ResearchNode) => {
    const isCompleted = completedResearch.includes(node.id);
    const isAvailable = availableNodes.some(n => n.id === node.id);
    const affordable = canAfford(node);
    const cost = calculateResearchCost(node);

    return (
      <div
        key={node.id}
        className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
          isCompleted
            ? 'border-green-500 bg-green-50'
            : isAvailable && affordable
            ? 'border-blue-500 bg-blue-50 hover:bg-blue-100'
            : isAvailable
            ? 'border-yellow-500 bg-yellow-50'
            : 'border-gray-300 bg-gray-100 opacity-60'
        }`}
        onClick={() => setSelectedNode(node)}
      >
        {/* Status indicators */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {isCompleted && <span className="text-green-600 text-sm">✓</span>}
          {node.special && <span className="text-purple-600 text-sm">★</span>}
          {node.chapterUnlock && <span className="text-orange-600 text-sm">📖</span>}
        </div>

        {/* Node header */}
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-800 pr-8">{node.name}</h3>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span>Tier {node.tier}</span>
            <span>•</span>
            <span className="capitalize">{node.branch}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-2">{node.description}</p>
        <p className="text-xs italic text-gray-500 mb-3">"{node.storyText}"</p>

        {/* Cost */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-700 mb-1">Cost:</div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(cost).map(([resource, amount]) => {
              const current = currentResources[resource as keyof typeof currentResources] || 0;
              const canAffordResource = current >= amount;

              return (
                <span
                  key={resource}
                  className={`px-2 py-1 rounded text-xs ${
                    isCompleted
                      ? 'bg-gray-200 text-gray-600'
                      : canAffordResource
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {amount} {resource}
                </span>
              );
            })}
          </div>
        </div>

        {/* Prerequisites */}
        {node.prerequisites.length > 0 && (
          <div className="mb-2">
            <div className="text-xs font-semibold text-gray-700 mb-1">Requires:</div>
            <div className="text-xs text-gray-600">
              {node.prerequisites.map(prereq => {
                const prereqCompleted = completedResearch.includes(prereq);
                return (
                  <span
                    key={prereq}
                    className={`inline-block mr-1 ${
                      prereqCompleted ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {prereqCompleted ? '✓' : '✗'} {prereq}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Chapter unlock requirement */}
        {node.chapterUnlock && (
          <div className="text-xs text-purple-600 mb-2">
            Unlocked by: {node.chapterUnlock.replace('chapter_', '').replace(/_/g, ' ')}
          </div>
        )}

        {/* Effects */}
        <div className="text-xs">
          <div className="font-semibold text-gray-700 mb-1">Effects:</div>
          {node.effects.map((effect, index) => (
            <div key={index} className="text-gray-600">
              • {effect.description}
            </div>
          ))}
        </div>

        {/* Research button */}
        {allowResearch && isAvailable && !isCompleted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleResearch(node);
            }}
            disabled={!affordable}
            className={`mt-3 w-full py-2 px-4 rounded text-sm font-semibold transition-colors ${
              affordable
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {affordable ? 'Research' : 'Cannot Afford'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterBranch('all')}
          className={`px-3 py-1 rounded text-sm ${
            filterBranch === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          All Branches
        </button>
        {branches.map(branch => (
          <button
            key={branch}
            onClick={() => setFilterBranch(branch)}
            className={`px-3 py-1 rounded text-sm capitalize ${
              filterBranch === branch
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Research nodes organized by tier */}
      {[1, 2, 3, 4].map(tier => {
        const tierNodes = filteredNodes.filter(node => node.tier === tier);
        if (tierNodes.length === 0) return null;

        return (
          <div key={tier} className="space-y-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">Tier {tier}</h2>
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-600">
                {tierNodes.filter(n => completedResearch.includes(n.id)).length} / {tierNodes.length} completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tierNodes.map(renderNodeCard)}
            </div>
          </div>
        );
      })}

      {/* Selected node details modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedNode.name}</h2>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
                  <p className="text-gray-600">{selectedNode.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Story</h3>
                  <p className="italic text-gray-600">"{selectedNode.storyText}"</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold">Tier:</span> {selectedNode.tier}</div>
                    <div><span className="font-semibold">Branch:</span> {selectedNode.branch}</div>
                    <div><span className="font-semibold">Special:</span> {selectedNode.special ? 'Yes' : 'No'}</div>
                    {selectedNode.chapterUnlock && (
                      <div><span className="font-semibold">Chapter Required:</span> {selectedNode.chapterUnlock}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Effects</h3>
                  <ul className="space-y-1">
                    {selectedNode.effects.map((effect, index) => (
                      <li key={index} className="text-gray-600">
                        • <span className="font-semibold">{effect.type}:</span> {effect.description}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedNode.unlocks.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Unlocks</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.unlocks.map(unlock => (
                        <span key={unlock} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {unlock}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};