/**
 * Mission Selection Canvas Component
 * Integrated campaign mission selection within the battle system
 */

import React, { useState } from 'react';
import { CAMPAIGN_CHAPTERS } from '../../data/campaignData';
import { useCampaignLogic } from '../../hooks/useCampaignLogic';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { CampaignChapter } from '../../data/campaignData';

interface MissionSelectionCanvasProps {
  onMissionStart?: (missionId: string) => void;
}

export const MissionSelectionCanvas: React.FC<MissionSelectionCanvasProps> = ({ onMissionStart }) => {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const {
    isChapterUnlocked,
    isChapterCompleted,
    isChapterActive,
    getChapterProgress
  } = useCampaignLogic(selectedMission);

  console.log('MissionSelectionCanvas mounted, CAMPAIGN_CHAPTERS:', CAMPAIGN_CHAPTERS.length);

  const handleMissionSelect = (chapterId: string) => {
    console.log('Mission selected:', chapterId);
    setSelectedMission(chapterId);
  };

  const handleStartMission = () => {
    console.log('handleStartMission called, selectedMission:', selectedMission);
    if (selectedMission) {
      if (onMissionStart) {
        console.log('Calling onMissionStart with:', selectedMission);
        onMissionStart(selectedMission);
      } else {
        // TODO: Initialize battle with selected mission parameters
        console.log('Starting mission (no callback):', selectedMission);
      }
    } else {
      console.log('No mission selected');
    }
  };

  const renderMissionCard = (chapter: CampaignChapter) => {
    const isUnlocked = isChapterUnlocked(chapter);
    const isCompleted = isChapterCompleted(chapter);
    const isActive = isChapterActive(chapter);
    const progress = getChapterProgress(chapter);

    console.log(`Chapter ${chapter.id}:`, {
      isUnlocked,
      isCompleted,
      isActive,
      prerequisites: chapter.prerequisites
    });

    return (
      <Card
        key={chapter.id}
        className={`p-4 transition-all duration-300 border-2 ${
          selectedMission === chapter.id
            ? 'border-ember bg-ember/20 animate-ember-glow cursor-pointer'
            : (isUnlocked || chapter.id === 'chapter_1_awakening')
            ? 'border-bronze hover:border-crystal hover:bg-crystal/10 cursor-pointer'
            : 'border-iron bg-iron/20 opacity-60 cursor-not-allowed'
        }`}
        onClick={() => {
          console.log('Card clicked:', chapter.id, 'isUnlocked:', isUnlocked);
          if (isUnlocked || chapter.id === 'chapter_1_awakening') {
            handleMissionSelect(chapter.id);
          }
        }}
      >
        {/* Mission Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {isCompleted ? '✅' : isActive ? '⚔️' : isUnlocked ? '🗺️' : '🔒'}
            </div>
            <div>
              <h3 className="font-frontier font-bold text-lg text-iron-dark">{chapter.title}</h3>
              <p className="text-sm text-parchment-dark font-parchment">{chapter.subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-sm ${i < chapter.starRating ? 'text-amber' : 'text-iron'}`}>
                  ⭐
                </span>
              ))}
            </div>
            <div className="text-xs text-parchment-dark font-parchment">
              {chapter.estimatedTurns[0]}-{chapter.estimatedTurns[1]} turns
            </div>
          </div>
        </div>

        {/* Mission Description */}
        <p className="text-sm text-parchment mb-3 font-parchment">{chapter.description}</p>

        {/* Progress Bar (if active) */}
        {isActive && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-parchment-dark font-parchment">Mission Progress</span>
              <span className="font-frontier font-bold text-iron-dark">{progress}%</span>
            </div>
            <div className="w-full bg-iron-dark rounded-full h-2 border border-bronze">
              <div
                className="h-2 rounded-full bg-ember animate-ember-glow transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Victory Conditions Preview */}
        <div className="space-y-1">
          <h4 className="text-xs font-frontier font-bold text-bronze mb-1">Mission Objectives:</h4>
          {chapter.victoryConditions.slice(0, 2).map((condition) => (
            <div key={condition.id} className="text-xs text-parchment-dark font-parchment flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${condition.completed ? 'bg-forest' : 'bg-iron'}`} />
              <span>{condition.description}</span>
            </div>
          ))}
          {chapter.victoryConditions.length > 2 && (
            <div className="text-xs text-bronze font-frontier">
              +{chapter.victoryConditions.length - 2} more objectives
            </div>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 mt-3">
          {isCompleted && (
            <span className="px-2 py-1 rounded text-xs font-frontier font-bold bg-forest/20 text-forest border border-forest">
              COMPLETED
            </span>
          )}
          {isActive && (
            <span className="px-2 py-1 rounded text-xs font-frontier font-bold bg-ember/20 text-ember border border-ember">
              IN PROGRESS
            </span>
          )}
          {!isUnlocked && (
            <span className="px-2 py-1 rounded text-xs font-frontier font-bold bg-iron/20 text-iron border border-iron">
              LOCKED
            </span>
          )}
        </div>
      </Card>
    );
  };

  const selectedChapter = CAMPAIGN_CHAPTERS.find(c => c.id === selectedMission);

  return (
    <div className="h-full flex flex-col bg-stone-texture p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-frontier font-bold text-iron-dark mb-2 text-battle-worn">
          🗺️ Campaign Missions
        </h2>
        <p className="text-parchment-dark font-parchment">
          Select a mission to begin your campaign through the restoration of Aeloria
        </p>
      </div>

      {/* Mission Selection */}
      <div className="flex-1 flex gap-6">
        {/* Mission List */}
        <div className="flex-1 space-y-3 overflow-y-auto">
          {CAMPAIGN_CHAPTERS.map(renderMissionCard)}
        </div>

        {/* Mission Details & Actions */}
        {selectedChapter && (
          <div className="w-1/3 space-y-4">
            <Card className="p-4">
              <h3 className="font-frontier font-bold text-lg text-iron-dark mb-3 text-battle-worn">
                Mission Details
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-frontier font-bold text-sm text-bronze mb-1">Core Challenge:</h4>
                  <p className="text-sm text-parchment-dark font-parchment">{selectedChapter.coreChallenge}</p>
                </div>

                <div>
                  <h4 className="font-frontier font-bold text-sm text-bronze mb-1">Victory Conditions:</h4>
                  <div className="space-y-1">
                    {selectedChapter.victoryConditions.map((condition) => (
                      <div key={condition.id} className="text-sm text-parchment-dark font-parchment flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${condition.completed ? 'bg-forest' : 'bg-iron'}`} />
                        <span>{condition.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedChapter.specialRules.length > 0 && (
                  <div>
                    <h4 className="font-frontier font-bold text-sm text-bronze mb-1">Special Rules:</h4>
                    <div className="space-y-1">
                      {selectedChapter.specialRules.map((rule) => (
                        <div key={rule.id} className="text-sm text-crystal font-parchment">
                          <span className="font-frontier font-bold">{rule.name}:</span> {rule.description}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              {isChapterUnlocked(selectedChapter) ? (
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleStartMission}
                  className="font-frontier font-bold"
                  leftIcon="⚔️"
                >
                  {isChapterActive(selectedChapter) ? 'Continue Mission' : 'Start Mission'}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  fullWidth
                  disabled
                  className="font-frontier font-bold"
                  leftIcon="🔒"
                >
                  Mission Locked
                </Button>
              )}

              <Button
                variant="ghost"
                fullWidth
                onClick={() => setSelectedMission(null)}
                className="font-frontier font-bold"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};