/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { CAMPAIGN_CHAPTERS, RESEARCH_TREE } from '../../data/campaignData';
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
    completedResearch,
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
      <h4 className="font-frontier font-bold text-xl text-iron-dark mb-3 text-battle-worn">Victory Conditions</h4>
      {chapter.victoryConditions.map((condition, index) => (
        <div
          key={condition.id}
          className={`p-4 rounded border-2 bg-metal-texture ${
            condition.completed ? 'border-forest bg-forest/10' : 'border-bronze'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-frontier font-semibold text-parchment-light">{condition.description}</span>
            {condition.completed && <span className="text-forest text-xl animate-pulse">⚔</span>}
          </div>
          <div className="mt-2">
            <div className="w-full bg-iron-dark rounded-full h-3 border border-bronze">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  condition.completed ? 'bg-forest animate-forge-flicker' : 'bg-ember animate-ember-glow'
                }`}
                style={{
                  width: `${Math.min(100, (condition.current / condition.target) * 100)}%`
                }}
              />
            </div>
            <span className="text-sm text-parchment font-parchment">
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
      <h4 className="font-frontier font-bold text-xl text-iron-dark mb-3 text-battle-worn">Story Events</h4>
      {chapter.storyEvents.map((event) => (
        <div key={event.id} className="p-4 border-2 border-bronze rounded-lg bg-metal-texture">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-frontier font-bold text-parchment-light">{event.title}</h5>
            <span className={`px-3 py-1 rounded font-frontier font-bold text-xs border-2 ${
              event.importance === 'critical' ? 'bg-blood text-parchment-light border-blood-dark animate-battle-shake' :
              event.importance === 'high' ? 'bg-ember text-iron-dark border-ember-dark animate-ember-glow' :
              event.importance === 'medium' ? 'bg-amber text-iron-dark border-amber-dark' :
              'bg-iron-light text-parchment border-iron'
            }`}>
              {event.importance}
            </span>
          </div>
          <p className="text-parchment mb-3 font-parchment italic">{event.description}</p>

          {event.choices.length > 0 && (
            <div className="space-y-2">
              <span className="font-frontier font-bold text-sm text-parchment-light">Choices:</span>
              {event.choices.map((choice) => (
                <div key={choice.id} className="ml-4 p-3 border-l-4 border-bronze bg-bronze-texture">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-frontier font-semibold text-parchment-light">{choice.text}</span>
                    <span className={`px-2 py-1 rounded text-xs font-frontier font-bold border ${
                      choice.morality === 'good' ? 'bg-forest text-parchment-light border-forest-dark' :
                      choice.morality === 'evil' ? 'bg-blood text-parchment-light border-blood-dark' :
                      'bg-iron text-parchment border-iron-light'
                    }`}>
                      {choice.morality}
                    </span>
                    <span className="text-xs text-parchment font-parchment">Difficulty: {choice.difficulty}</span>
                  </div>
                  <p className="text-sm text-parchment-dark mt-1 font-parchment">{choice.description}</p>
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
      <h4 className="font-frontier font-bold text-xl text-iron-dark mb-3 text-battle-worn">Research Tree</h4>

      {[1, 2, 3, 4].map(tier => {
        const tierNodes = RESEARCH_TREE.filter(node => node.tier === tier);
        if (tierNodes.length === 0) return null;

        return (
          <div key={tier} className="space-y-3">
            <h5 className="font-frontier font-bold text-bronze text-lg border-b-2 border-bronze pb-1">Tier {tier}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tierNodes.map(node => {
                const isCompleted = completedResearch.includes(node.id);
                const isAvailable = availableResearch.some(r => r.id === node.id);
                const isLocked = !isAvailable && !isCompleted;

                return (
                  <div
                    key={node.id}
                    className={`p-4 rounded border-2 transition-all duration-300 ${
                      isCompleted ? 'border-forest bg-forest/20 animate-forge-flicker' :
                      isAvailable ? 'border-mana bg-mana/20 animate-ember-glow' :
                      'border-iron bg-iron/20 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-frontier font-bold text-sm text-parchment-light">{node.name}</h6>
                      {isCompleted && <span className="text-forest text-lg animate-pulse">⚡</span>}
                      {node.special && <span className="text-amber text-lg animate-ember-glow">★</span>}
                    </div>

                    <p className="text-xs text-parchment mb-2 font-parchment">{node.description}</p>
                    <p className="text-xs italic text-parchment-dark mb-2 font-parchment">"{node.storyText}"</p>

                    <div className="space-y-1 text-xs font-parchment">
                      <div><span className="font-frontier font-semibold text-bronze">Branch:</span> <span className="text-parchment">{node.branch}</span></div>
                      <div><span className="font-frontier font-semibold text-bronze">Cost:</span> <span className="text-parchment">{
                        Object.entries(node.cost)
                          .map(([resource, amount]) => `${amount} ${resource}`)
                          .join(', ')
                      }</span></div>

                      {node.prerequisites.length > 0 && (
                        <div><span className="font-frontier font-semibold text-bronze">Requires:</span> <span className="text-parchment">{node.prerequisites.join(', ')}</span></div>
                      )}

                      {node.chapterUnlock && (
                        <div className="text-crystal">
                          <span className="font-frontier font-semibold">Chapter:</span> {node.chapterUnlock.replace('chapter_', '').replace(/_/g, ' ')}
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
    <div className="min-h-screen bg-stone-texture text-parchment-light p-6 font-parchment">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-frontier font-bold mb-2 text-center text-ember-enhanced">
          The Chronicles of Redemption
        </h1>
        <p className="text-center text-parchment mb-8 font-frontier text-lg text-battle-worn">
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
                className="btn-frontier animate-battle-shake hover:animate-ember-glow"
              >
                ← Back to Chapters
              </button>
              <h2 className="text-2xl font-frontier font-bold text-forge-steel">{currentChapter?.title}</h2>
            </div>

            <div className="flex space-x-4 mb-6">
              {['overview', 'research', 'events'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded font-frontier font-bold transition-all duration-300 border-2 ${
                    activeTab === tab
                      ? 'bg-bronze-texture text-parchment-light border-ember animate-ember-glow'
                      : 'bg-metal-texture text-parchment border-iron-light hover:border-bronze hover:bg-bronze-texture'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="bg-parchment text-iron-dark rounded-lg p-6 border-forge">
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
