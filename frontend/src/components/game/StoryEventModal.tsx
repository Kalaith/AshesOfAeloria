import React, { useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import type { ChapterEvent, EventChoice } from '../../data/campaignData';

interface StoryEventModalProps {
  event: ChapterEvent;
  isOpen: boolean;
  onClose: () => void;
  onChoiceSelected: (choiceId: string) => void;
}

export const StoryEventModal: React.FC<StoryEventModalProps> = ({
  event,
  isOpen,
  onClose,
  onChoiceSelected
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const gameState = useGameStore();

  if (!isOpen) return null;

  const handleChoiceSelection = (choice: EventChoice) => {
    setSelectedChoice(choice.id);

    // Check if player meets requirements
    const meetsRequirements = choice.requirements.every(req => {
      // This would check against actual game state
      // For now, we'll assume requirements are met
      return true;
    });

    if (!meetsRequirements) {
      alert('You do not meet the requirements for this choice!');
      return;
    }

    setShowConsequences(true);
  };

  const confirmChoice = () => {
    if (selectedChoice) {
      onChoiceSelected(selectedChoice);
      onClose();
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'border-blood bg-blood/20';
      case 'high': return 'border-ember bg-ember/20';
      case 'medium': return 'border-amber bg-amber/20';
      default: return 'border-bronze bg-bronze/20';
    }
  };

  const getMoralityColor = (morality: string) => {
    switch (morality) {
      case 'good': return 'bg-forest/20 text-forest border-forest';
      case 'evil': return 'bg-blood/20 text-blood border-blood';
      default: return 'bg-bronze/20 text-parchment-dark border-bronze';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  const selectedChoiceData = event.choices.find(c => c.id === selectedChoice);

  return (
    <div className="fixed inset-0 bg-iron-dark bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className={`bg-parchment rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto border-4 ${getImportanceColor(event.importance)}`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-frontier font-bold text-iron-dark mb-2 text-battle-worn">📜 {event.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-frontier font-bold border-2 ${
                  event.importance === 'critical' ? 'bg-blood/20 text-blood border-blood' :
                  event.importance === 'high' ? 'bg-ember/20 text-ember border-ember' :
                  event.importance === 'medium' ? 'bg-amber/20 text-amber border-amber' :
                  'bg-bronze/20 text-parchment-dark border-bronze'
                }`}>
                  ⚔ {event.importance.toUpperCase()} CAMPAIGN EVENT
                </span>
                {event.unique && (
                  <span className="px-3 py-1 rounded-full text-sm font-frontier font-bold bg-crystal/20 text-crystal border-2 border-crystal">
                    ✨ LEGENDARY
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-parchment-dark hover:text-iron-dark text-2xl font-frontier font-bold"
            >
              ✕
            </button>
          </div>

          {/* Event Description */}
          <div className="mb-8 p-4 bg-bronze-texture rounded-lg border-2 border-bronze">
            <div className="prose prose-lg max-w-none">
              <p className="text-parchment-dark leading-relaxed text-lg font-parchment">{event.description}</p>
            </div>
          </div>

          {!showConsequences ? (
            /* Choice Selection */
            <div className="space-y-4">
              <h2 className="text-2xl font-frontier font-bold text-iron-dark mb-4 text-battle-worn">⚔ Choose Your War Response</h2>
              {event.choices.map((choice) => {
                const meetsRequirements = choice.requirements.every(req => {
                  // In a real implementation, this would check actual game state
                  return true; // For now, assume all requirements are met
                });

                return (
                  <div
                    key={choice.id}
                    onClick={() => meetsRequirements && handleChoiceSelection(choice)}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedChoice === choice.id
                        ? 'border-crystal bg-crystal/20 animate-forge-flicker'
                        : meetsRequirements
                        ? 'border-bronze hover:border-crystal bg-bronze-texture hover:bg-crystal/10'
                        : 'border-iron bg-iron/20 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-frontier font-bold text-iron-dark">{choice.text}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm font-frontier font-bold border-2 ${getMoralityColor(choice.morality)}`}>
                          {choice.morality.toUpperCase()}
                        </span>
                        <span className="text-amber text-sm font-frontier font-bold" title={`Difficulty: ${choice.difficulty}/5`}>
                          {getDifficultyStars(choice.difficulty)}
                        </span>
                      </div>
                    </div>

                    <p className="text-parchment-dark mb-4 font-parchment">{choice.description}</p>

                    {choice.requirements.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm font-semibold text-gray-600 mb-2 block">Requirements:</span>
                        <div className="flex flex-wrap gap-1">
                          {choice.requirements.map((req, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                meetsRequirements
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {!meetsRequirements && (
                      <div className="text-red-600 text-sm font-semibold">
                        You do not meet the requirements for this choice.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Consequences Preview */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Consequences</h2>
              {selectedChoiceData && (
                <div className="p-6 border-2 border-blue-500 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">You chose: {selectedChoiceData.text}</h3>
                  <p className="text-gray-700 mb-4">{selectedChoiceData.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">This will result in:</h4>
                    {selectedChoiceData.consequences.map((consequence, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded border">
                        <div className={`w-3 h-3 rounded-full ${
                          consequence.value > 0 ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">
                            {consequence.type}: {consequence.target}
                          </div>
                          <div className="text-gray-600">
                            {consequence.description} ({consequence.value > 0 ? '+' : ''}{consequence.value})
                          </div>
                          {consequence.permanent && (
                            <div className="text-purple-600 text-sm font-semibold">
                              Permanent Effect
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            {showConsequences ? (
              <>
                <button
                  onClick={() => {
                    setShowConsequences(false);
                    setSelectedChoice(null);
                  }}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded font-semibold transition-colors"
                >
                  Back to Choices
                </button>
                <button
                  onClick={confirmChoice}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors"
                >
                  Confirm Decision
                </button>
              </>
            ) : (
              <button
                onClick={() => selectedChoice && setShowConsequences(true)}
                disabled={!selectedChoice}
                className={`px-6 py-3 rounded font-semibold transition-colors ${
                  selectedChoice
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Preview Consequences
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryEventModal;