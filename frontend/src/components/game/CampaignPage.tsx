import React, { useState, useCallback } from 'react';
import { CAMPAIGN_CHAPTERS } from '../../data/campaignData';
import { ChapterCard } from '../campaign/ChapterCard';
import { useCampaignLogic } from '../../hooks/useCampaignLogic';
import { validateChapterId } from '../../validators/gameValidators';
import type { CampaignChapter, ChapterEvent, ResearchNode } from '../../data/campaignData';

export const CampaignPage: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'events'>('overview');

  const {
    currentChapter,
    availableResearch,
    isChapterUnlocked,
    isChapterCompleted,
    isChapterActive,
    getChapterProgress
  } = useCampaignLogic(selectedChapter);

  const handleChapterSelection = useCallback((chapterId: string) => {
    const validation = validateChapterId(chapterId);
    if (validation.success) {
      setSelectedChapter(chapterId);
    } else {
      console.error('Invalid chapter selection:', validation.error);
    }
  }, []);

  const renderChapterCard = useCallback((chapter: CampaignChapter) => {
    const isUnlocked = isChapterUnlocked(chapter);
    const isCompleted = isChapterCompleted(chapter);
    const isActive = isChapterActive(chapter);
    const progress = getChapterProgress(chapter);

    return (
      <ChapterCard
        key={chapter.id}
        chapter={chapter}
        isUnlocked={isUnlocked}
        isCompleted={isCompleted}
        isActive={isActive}
        progress={progress}
        onClick={handleChapterSelection}
      />
    );
  }, [isChapterUnlocked, isChapterCompleted, isChapterActive, getChapterProgress, handleChapterSelection]);

  const renderVictoryConditions = (chapter: CampaignChapter) => (
    <div className="space-y-3">
      <h4 className="font-bold text-lg text-gray-800 mb-3">Victory Conditions</h4>
      {chapter.victoryConditions.map((condition, index) => (
        <div
          key={condition.id}
          className={`p-3 rounded border ${
            condition.completed ? 'border-green-400 bg-green-50' : 'border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{condition.description}</span>
            {condition.completed && <span className="text-green-600">✓</span>}
          </div>
          <div className="mt-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  condition.completed ? 'bg-green-400' : 'bg-blue-400'
                }`}
                style={{
                  width: `${Math.min(100, (condition.current / condition.target) * 100)}%`
                }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {condition.current} / {condition.target}
              {condition.optional && ' (Optional)'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStoryEvents = (chapter: CampaignChapter) => (
    <div className="space-y-4">
      <h4 className="font-bold text-lg text-gray-800 mb-3">Story Events</h4>
      {chapter.storyEvents.map((event) => (
        <div key={event.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-bold text-gray-800">{event.title}</h5>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              event.importance === 'critical' ? 'bg-red-200 text-red-800' :
              event.importance === 'high' ? 'bg-orange-200 text-orange-800' :
              event.importance === 'medium' ? 'bg-yellow-200 text-yellow-800' :
              'bg-gray-200 text-gray-800'
            }`}>
              {event.importance}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{event.description}</p>

          {event.choices.length > 0 && (
            <div className="space-y-2">
              <span className="font-semibold text-sm text-gray-700">Choices:</span>
              {event.choices.map((choice) => (
                <div key={choice.id} className="ml-4 p-2 border-l-4 border-blue-300 bg-white">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{choice.text}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      choice.morality === 'good' ? 'bg-green-200 text-green-800' :
                      choice.morality === 'evil' ? 'bg-red-200 text-red-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {choice.morality}
                    </span>
                    <span className="text-xs text-gray-600">Difficulty: {choice.difficulty}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{choice.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderResearchTree = () => (
    <div className="space-y-6">
      <h4 className="font-bold text-lg text-gray-800 mb-3">Research Tree</h4>

      {[1, 2, 3, 4].map(tier => {
        const tierNodes = RESEARCH_TREE.filter(node => node.tier === tier);
        if (tierNodes.length === 0) return null;

        return (
          <div key={tier} className="space-y-3">
            <h5 className="font-bold text-gray-700">Tier {tier}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tierNodes.map(node => {
                const isCompleted = gameState.completedResearch?.includes(node.id);
                const isAvailable = availableResearch.some(r => r.id === node.id);
                const isLocked = !isAvailable && !isCompleted;

                return (
                  <div
                    key={node.id}
                    className={`p-4 rounded border ${
                      isCompleted ? 'border-green-400 bg-green-50' :
                      isAvailable ? 'border-blue-400 bg-blue-50' :
                      'border-gray-300 bg-gray-100 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-bold text-sm">{node.name}</h6>
                      {isCompleted && <span className="text-green-600 text-xs">✓</span>}
                      {node.special && <span className="text-purple-600 text-xs">★</span>}
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{node.description}</p>
                    <p className="text-xs italic text-gray-500 mb-2">"{node.storyText}"</p>

                    <div className="space-y-1 text-xs">
                      <div><span className="font-semibold">Branch:</span> {node.branch}</div>
                      <div><span className="font-semibold">Cost:</span> {
                        Object.entries(node.cost)
                          .map(([resource, amount]) => `${amount} ${resource}`)
                          .join(', ')
                      }</div>

                      {node.prerequisites.length > 0 && (
                        <div><span className="font-semibold">Requires:</span> {node.prerequisites.join(', ')}</div>
                      )}

                      {node.chapterUnlock && (
                        <div className="text-purple-600">
                          <span className="font-semibold">Chapter:</span> {node.chapterUnlock.replace('chapter_', '').replace(/_/g, ' ')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          The Chronicles of Redemption
        </h1>
        <p className="text-center text-gray-300 mb-8">
          A story-driven campaign through the restoration of Aeloria
        </p>

        {!selectedChapter ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CAMPAIGN_CHAPTERS.map(renderChapterCard)}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
              >
                ← Back to Chapters
              </button>
              <h2 className="text-2xl font-bold">{currentChapter?.title}</h2>
            </div>

            <div className="flex space-x-4 mb-6">
              {['overview', 'research', 'events'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="bg-white text-gray-900 rounded-lg p-6">
              {activeTab === 'overview' && currentChapter && renderVictoryConditions(currentChapter)}
              {activeTab === 'research' && renderResearchTree()}
              {activeTab === 'events' && currentChapter && renderStoryEvents(currentChapter)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};