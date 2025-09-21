import React, { useState } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useGameStore } from '../../stores/useGameStore';
import { Button } from '../ui/Button';

interface GameHeaderProps {
  currentView?: 'game' | 'campaign';
  onViewChange?: (view: 'game' | 'campaign') => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentView = 'game',
  onViewChange
}) => {
  const { turn } = useGameLogic();
  const resetGame = useGameStore(state => state.resetGame);
  const repairMapConnections = useGameStore(state => state.repairMapConnections);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm gap-2 sm:gap-0">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl lg:text-2xl font-bold text-blue-600 m-0">⚔️ Ashes of Aeloria</h1>
          {onViewChange && (
            <div className="flex bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => onViewChange('game')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  currentView === 'game'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🎯 Battle
              </button>
              <button
                onClick={() => onViewChange('campaign')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  currentView === 'campaign'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📖 Campaign
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-3 lg:gap-6 items-center">
          {currentView === 'game' && (
            <>
              <span className="font-medium px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-100 text-blue-800 rounded-md text-sm lg:text-base">Turn: {turn}</span>
              <span className="font-medium px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-100 text-blue-800 rounded-md text-sm lg:text-base">Phase: Player</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRepairConnections}
                className="text-xs lg:text-sm"
                title="Fix map connections if they appear broken"
              >
                🔧 Repair Map
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleResetClick}
            className="text-xs lg:text-sm"
          >
            🔄 Reset Game
          </Button>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 lg:p-8 rounded-lg border border-gray-200 text-center w-full max-w-sm shadow-lg">
            <h2 className="text-xl lg:text-2xl mb-4">🔄 Reset Game</h2>
            <p className="mb-6 text-gray-600 leading-normal text-sm lg:text-base">
              Are you sure you want to reset the game? All progress will be lost and the game will start fresh.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="secondary" 
                onClick={handleCancelReset}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleConfirmReset}
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
