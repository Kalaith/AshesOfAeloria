import React, { useState } from "react";
import { useGameStore } from "../../stores/useGameStore";
import type { GameEvent, EventChoice, GameState } from "../../types/game.d.js";

interface StoryEventModalProps {
  event: GameEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onChoiceSelected: (eventId: string, choiceId: string) => void;
}

export const StoryEventModal: React.FC<StoryEventModalProps> = ({
  event,
  isOpen,
  onClose,
  onChoiceSelected,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showConsequences, setShowConsequences] = useState(false);
  const gameState = useGameStore();

  if (!isOpen || !event) return null;

  const handleChoiceSelection = (choice: EventChoice) => {
    setSelectedChoice(choice.id);

    // Check if player meets requirements
    const meetsRequirements = choice.requirements.every((req) => {
      // Check against actual game state
      return checkRequirement(req, gameState);
    });

    if (!meetsRequirements) {
      alert("You do not meet the requirements for this choice!");
      return;
    }

    setShowConsequences(true);
  };

  const confirmChoice = () => {
    if (selectedChoice && event) {
      onChoiceSelected(event.id, selectedChoice);
      setSelectedChoice(null);
      setShowConsequences(false);
      onClose();
    }
  };

  const checkRequirement = (
    requirement: string,
    gameState: GameState,
  ): boolean => {
    // Parse requirements like "flag:authoritative_leader", "reputation:ember_keepers:>=:20"
    const parts = requirement.split(":");

    switch (parts[0]) {
      case "flag":
        return gameState.narrativeState?.narrativeFlags?.[parts[1]] || false;

      case "reputation": {
        const faction = parts[1];
        const operator = parts[2];
        const value = parseInt(parts[3]);
        const reputation =
          gameState.diplomacy?.playerFactionRelations?.[faction] || 0;

        switch (operator) {
          case ">=":
            return reputation >= value;
          case "<=":
            return reputation <= value;
          case ">":
            return reputation > value;
          case "<":
            return reputation < value;
          case "==":
            return reputation === value;
          default:
            return false;
        }
      }

      case "resources": {
        const resource = parts[1];
        const resOperator = parts[2];
        const resValue = parseInt(parts[3]);
        const currentRes = gameState.resources?.[resource] || 0;

        switch (resOperator) {
          case ">=":
            return currentRes >= resValue;
          case "<=":
            return currentRes <= resValue;
          case ">":
            return currentRes > resValue;
          case "<":
            return currentRes < resValue;
          case "==":
            return currentRes === resValue;
          default:
            return false;
        }
      }

      case "technology":
        return gameState.globalTechnologies?.includes(parts[1]) || false;

      case "scholars": {
        const requiredScholars = parseInt(parts[1]);
        const currentScholars =
          gameState.research?.scholarNetwork?.scholars?.length || 0;
        return currentScholars >= requiredScholars;
      }

      default:
        return true; // Unknown requirements default to true
    }
  };

  const getImportanceColor = (importance: number) => {
    if (importance >= 80) return "border-red-600 bg-red-600/20";
    if (importance >= 60) return "border-orange-600 bg-orange-600/20";
    if (importance >= 40) return "border-yellow-600 bg-yellow-600/20";
    return "border-gray-600 bg-gray-600/20";
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "scripted":
        return "bg-yellow-600/20 text-yellow-600 border-yellow-600";
      case "random":
        return "bg-blue-600/20 text-blue-600 border-blue-600";
      case "consequence":
        return "bg-red-600/20 text-red-600 border-red-600";
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-600";
    }
  };

  const getChoiceRequirementsStatus = (choice: EventChoice) => {
    const meetsAll = choice.requirements.every((req) =>
      checkRequirement(req, gameState),
    );
    return {
      meetsAll,
      requirements: choice.requirements.map((req) => ({
        text: req,
        met: checkRequirement(req, gameState),
      })),
    };
  };

  const selectedChoiceData = event.choices.find((c) => c.id === selectedChoice);
  const selectedChoiceStatus = selectedChoiceData
    ? getChoiceRequirementsStatus(selectedChoiceData)
    : null;

  return (
    <div className="fixed inset-0 bg-charcoal bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-stone-900 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto border-4 ${getImportanceColor(event.importance)}`}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-parchment-light mb-2">
                📜 {event.title}
              </h1>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getEventTypeColor(event.type)}`}
                >
                  ⚔ {event.type.toUpperCase()} EVENT
                </span>
                {event.importance >= 80 && (
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-crystal-teal/20 text-crystal-teal border-2 border-crystal-teal">
                    ✨ CRITICAL
                  </span>
                )}
              </div>
              <div className="text-sm text-stone-400 mt-2">
                Turn {event.turn} • Importance: {event.importance}/100
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-parchment-light text-2xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Event Description */}
          <div className="mb-8 p-6 bg-charcoal/40 rounded-lg border-2 border-aged-steel/30">
            <div className="prose prose-lg max-w-none">
              <p className="text-parchment-light leading-relaxed text-lg">
                {event.description}
              </p>
            </div>
          </div>

          {!showConsequences ? (
            /* Choice Selection */
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-parchment-light mb-4">
                ⚔ Choose Your Response
              </h2>
              {event.choices.map((choice) => {
                const status = getChoiceRequirementsStatus(choice);

                return (
                  <div
                    key={choice.id}
                    onClick={() =>
                      status.meetsAll && handleChoiceSelection(choice)
                    }
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedChoice === choice.id
                        ? "border-crystal-teal bg-crystal-teal/20"
                        : status.meetsAll
                          ? "border-aged-steel hover:border-crystal-teal bg-charcoal/20 hover:bg-crystal-teal/10"
                          : "border-stone-600 bg-stone-800/20 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-parchment-light">
                        {choice.text}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {status.meetsAll ? (
                          <span className="px-2 py-1 rounded text-sm font-bold border-2 bg-green-600/20 text-green-600 border-green-600">
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-sm font-bold border-2 bg-red-600/20 text-red-600 border-red-600">
                            LOCKED
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-stone-300 mb-4">{choice.description}</p>

                    {choice.requirements.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm font-semibold text-stone-400 mb-2 block">
                          Requirements:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {status.requirements.map((req, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                req.met
                                  ? "bg-green-600/20 text-green-600"
                                  : "bg-red-600/20 text-red-600"
                              }`}
                            >
                              {req.text} {req.met ? "✓" : "✗"}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Consequences Preview */}
                    {choice.consequences.length > 0 && (
                      <div className="mt-3 text-xs text-stone-400">
                        <span className="font-medium">Effects: </span>
                        {choice.consequences
                          .slice(0, 2)
                          .map((c) => c.description)
                          .join(", ")}
                        {choice.consequences.length > 2 && "..."}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Consequences Preview */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-parchment-light">
                Consequences
              </h2>
              {selectedChoiceData && selectedChoiceStatus?.meetsAll && (
                <div className="p-6 border-2 border-crystal-teal bg-crystal-teal/10 rounded-lg">
                  <h3 className="text-xl font-bold mb-2 text-parchment-light">
                    You chose: {selectedChoiceData.text}
                  </h3>
                  <p className="text-stone-300 mb-4">
                    {selectedChoiceData.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-bold text-parchment-light">
                      This will result in:
                    </h4>
                    {selectedChoiceData.consequences.map(
                      (consequence, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-charcoal/40 rounded border border-aged-steel/30"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              consequence.value > 0
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-parchment-light">
                              {consequence.type}: {consequence.target}
                            </div>
                            <div className="text-stone-300">
                              {consequence.description} (
                              {consequence.value > 0 ? "+" : ""}
                              {consequence.value})
                            </div>
                            {consequence.permanent && (
                              <div className="text-yellow-600 text-sm font-semibold">
                                Permanent Effect
                              </div>
                            )}
                          </div>
                        </div>
                      ),
                    )}
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
                  className="px-6 py-3 bg-stone-600 hover:bg-stone-500 text-parchment-light rounded font-semibold transition-colors"
                >
                  Back to Choices
                </button>
                <button
                  onClick={confirmChoice}
                  className="px-6 py-3 bg-orange-600 hover:bg-yellow-600 text-white rounded font-semibold transition-colors"
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
                    ? "bg-orange-600 hover:bg-yellow-600 text-white"
                    : "bg-stone-600 text-stone-400 cursor-not-allowed"
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
