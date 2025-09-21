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
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getMoralityColor = (morality: string) => {
    switch (morality) {
      case 'good': return 'bg-green-100 text-green-800 border-green-300';
      case 'evil': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  const selectedChoiceData = event.choices.find(c => c.id === selectedChoice);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto border-4 ${getImportanceColor(event.importance)}`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                  event.importance === 'critical' ? 'bg-red-100 text-red-800 border-red-300' :
                  event.importance === 'high' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                  event.importance === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                  'bg-gray-100 text-gray-800 border-gray-300'
                }`}>
                  {event.importance.toUpperCase()} EVENT
                </span>
                {event.unique && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-300">
                    UNIQUE
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Event Description */}
          <div className="mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
            </div>
          </div>

          {!showConsequences ? (
            /* Choice Selection */
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Response</h2>
              {event.choices.map((choice) => {
                const meetsRequirements = choice.requirements.every(req => {
                  // In a real implementation, this would check actual game state
                  return true; // For now, assume all requirements are met
                });

                return (
                  <div
                    key={choice.id}
                    onClick={() => meetsRequirements && handleChoiceSelection(choice)}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedChoice === choice.id
                        ? 'border-blue-500 bg-blue-50'
                        : meetsRequirements
                        ? 'border-gray-300 hover:border-gray-400 bg-white'
                        : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{choice.text}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm font-semibold border ${getMoralityColor(choice.morality)}`}>
                          {choice.morality.toUpperCase()}
                        </span>
                        <span className="text-yellow-500 text-sm" title={`Difficulty: ${choice.difficulty}/5`}>
                          {getDifficultyStars(choice.difficulty)}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{choice.description}</p>

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