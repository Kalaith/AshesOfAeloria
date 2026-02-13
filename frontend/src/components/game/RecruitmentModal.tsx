import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useGameStore } from "../../stores/useGameStore";
import { gameData } from "../../data/gameData";
import type { CommanderClass, Race } from "../../types/game";

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruitmentModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedClass, setSelectedClass] = useState<CommanderClass | null>(
    null,
  );
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const resources = useGameStore((state) => state.resources);
  const addCommander = useGameStore((state) => state.addCommander);

  const handleConfirmRecruitment = () => {
    if (selectedClass && selectedRace) {
      const success = addCommander(selectedClass, selectedRace);
      if (success) {
        setSelectedClass(null);
        setSelectedRace(null);
        onClose();
      }
    }
  };

  const handleCancel = () => {
    setSelectedClass(null);
    setSelectedRace(null);
    onClose();
  };

  const canAfford = selectedClass
    ? resources.gold >= gameData.commanderClasses[selectedClass].cost
    : false;

  const footer = (
    <>
      <Button
        variant="secondary"
        onClick={handleCancel}
        fullWidth
        className="sm:w-auto font-frontier font-bold"
      >
        Withdraw Offer
      </Button>
      <Button
        variant="recruit"
        onClick={handleConfirmRecruitment}
        disabled={!selectedClass || !selectedRace || !canAfford}
        fullWidth
        className="sm:w-auto font-frontier font-bold"
      >
        Enlist War Leader (
        {selectedClass ? gameData.commanderClasses[selectedClass].cost : "-"}{" "}
        🪙)
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="⚔ Enlist War Leader"
      footer={footer}
    >
      <div className="space-y-4 lg:space-y-6">
        <div>
          <h4 className="text-sm lg:text-md font-frontier font-bold text-iron-dark mb-3 text-battle-worn">
            ⚔ Choose War Leader Class:
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(gameData.commanderClasses).map(
              ([key, classData]) => (
                <div
                  key={key}
                  className={`p-3 border-2 rounded cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                    selectedClass === key
                      ? "border-ember bg-ember/20 text-parchment-light animate-ember-glow"
                      : "border-bronze bg-bronze/10 hover:border-ember hover:bg-ember/10"
                  }`}
                  onClick={() => setSelectedClass(key as CommanderClass)}
                >
                  <div className="text-lg lg:text-xl w-6 lg:w-8 text-center flex-shrink-0">
                    {classData.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-frontier font-bold text-sm lg:text-base">
                      {classData.name}
                    </div>
                    <div
                      className={`text-xs lg:text-sm mt-1 font-parchment ${selectedClass === key ? "text-parchment" : "text-parchment-dark"}`}
                    >
                      {classData.description}
                    </div>
                  </div>
                  <div className="text-sm font-frontier font-bold text-amber">
                    Cost: {classData.cost} 🪙
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm lg:text-md font-frontier font-bold text-iron-dark mb-3 text-battle-worn">
            🏺 Choose Bloodline Heritage:
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(gameData.races).map(([key, raceData]) => (
              <div
                key={key}
                className={`p-3 border-2 rounded cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                  selectedRace === key
                    ? "border-crystal bg-crystal/20 text-parchment-light animate-forge-flicker"
                    : "border-bronze bg-bronze/10 hover:border-crystal hover:bg-crystal/10"
                }`}
                onClick={() => setSelectedRace(key as Race)}
              >
                <div className="text-lg lg:text-xl w-6 lg:w-8 text-center flex-shrink-0">
                  {raceData.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-frontier font-bold text-sm lg:text-base">
                    {raceData.name}
                  </div>
                  <div
                    className={`text-xs lg:text-sm mt-1 font-parchment ${selectedRace === key ? "text-parchment" : "text-parchment-dark"}`}
                  >
                    {raceData.bonus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bronze-texture p-3 lg:p-4 rounded-lg border-2 border-bronze">
          {selectedClass && selectedRace ? (
            <div className="space-y-2 lg:space-y-3">
              <h4 className="text-sm lg:text-md font-frontier font-bold text-parchment-light text-battle-worn">
                ⚔ War Leader Dossier:
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-parchment-dark font-parchment">
                    🎭 Identity:
                  </span>
                  <span className="font-frontier font-bold text-parchment-light">
                    {gameData.races[selectedRace].name}{" "}
                    {gameData.commanderClasses[selectedClass].name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-parchment-dark font-parchment">
                    🩸 Battle Endurance:
                  </span>
                  <span className="font-frontier font-bold text-forest">
                    {gameData.commanderClasses[selectedClass].baseHealth}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-parchment-dark font-parchment">
                    ⚔ Battle Prowess:
                  </span>
                  <span className="font-frontier font-bold text-blood">
                    {gameData.commanderClasses[selectedClass].baseAttack}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-parchment-dark font-parchment">
                    🛡 Tactical Defense:
                  </span>
                  <span className="font-frontier font-bold text-mana">
                    {gameData.commanderClasses[selectedClass].baseDefense}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-parchment-dark font-parchment">
                    ✨ War Specialty:
                  </span>
                  <span className="font-frontier font-bold text-crystal">
                    {gameData.commanderClasses[selectedClass].specialAbility}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-parchment-dark font-parchment">
                    🏺 Heritage Blessing:
                  </span>
                  <span className="font-frontier font-bold text-amber">
                    {gameData.races[selectedRace].bonus}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-parchment-dark text-center font-parchment italic">
              Select war leader class and bloodline heritage to view combat
              profile
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
