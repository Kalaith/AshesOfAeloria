import React, { useState } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useGameStore } from '../../stores/useGameStore';
import { Button } from '../ui/Button';
import { GameplayTestPanel } from '../testing/GameplayTestPanel';

interface GameHeaderProps {
  showMissionSelect?: boolean;
  onReturnToMissionSelect?: () => void;
  currentMission?: string | null;
  onRestartMission?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  showMissionSelect = false,
  onReturnToMissionSelect,
  currentMission,
  onRestartMission,
}) => {
  const { turn } = useGameLogic();
  const resetGame = useGameStore(state => state.resetGame);
  const repairMapConnections = useGameStore(state => state.repairMapConnections);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTestPanel, setShowTestPanel] = useState(false);

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleRepairConnections = () => {
    repairMapConnections();
  };

  const handleConfirmReset = () => {
    resetGame();
    setShowResetConfirm(false);
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <>
      <header className="bg-bronze-texture border-b-4 border-bronze px-4 lg:px-6 py-3 lg:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl lg:text-2xl font-frontier font-bold m-0 text-ember-enhanced">
            ⚔ Ashes of Aeloria Campaign
          </h1>
        </div>
        <div className="flex gap-3 lg:gap-6 items-center">
          {showMissionSelect && onReturnToMissionSelect && (
            <Button
              variant="primary"
              size="sm"
              onClick={onReturnToMissionSelect}
              className="text-xs lg:text-sm"
            >
              🗺️ Mission Select
            </Button>
          )}
          {currentMission && onRestartMission && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onRestartMission}
              className="text-xs lg:text-sm"
              title="Restart the current mission with fresh resources"
            >
              🔄 Restart Mission
            </Button>
          )}
          <span className="font-frontier font-bold px-3 lg:px-4 py-1.5 lg:py-2 bg-metal-texture text-light-enhanced rounded-md text-sm lg:text-base border-2 border-iron">
            Turn: {turn}
          </span>
          <span className="font-frontier font-bold px-3 lg:px-4 py-1.5 lg:py-2 bg-metal-texture text-light-enhanced rounded-md text-sm lg:text-base border-2 border-iron">
            Phase: Player
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRepairConnections}
            className="text-xs lg:text-sm"
            title="Fix map connections if they appear broken"
          >
            🔧 Repair Map
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowTestPanel(true)}
            className="text-xs lg:text-sm"
            title="Open gameplay testing panel"
          >
            🤖 Balance Tests
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleResetClick}
            className="text-xs lg:text-sm"
          >
            🔄 Reset Campaign
          </Button>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-parchment p-6 lg:p-8 rounded-lg border-4 border-bronze bg-metal-texture text-center w-full max-w-sm">
            <h2 className="text-xl lg:text-2xl mb-4 font-frontier font-bold text-iron-dark text-battle-worn">
              🔄 Reset Campaign
            </h2>
            <p className="mb-6 text-iron leading-normal text-sm lg:text-base font-parchment">
              Are you sure you want to reset the campaign? All progress will be lost and you will
              start from the first mission.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" onClick={handleCancelReset} className="flex-1">
                Cancel
              </Button>
              <Button variant="attack" onClick={handleConfirmReset} className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Testing Panel Modal */}
      {showTestPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-parchment rounded-lg border-4 border-bronze bg-metal-texture w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b-2 border-bronze">
              <h2 className="text-xl lg:text-2xl font-frontier font-bold text-iron-dark text-battle-worn">
                🤖 Gameplay Balance Testing
              </h2>
              <Button
                variant="secondary"
                onClick={() => setShowTestPanel(false)}
                className="font-frontier font-bold"
              >
                ✕ Close
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <GameplayTestPanel />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
