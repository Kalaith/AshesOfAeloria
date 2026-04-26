import React, { Suspense, lazy, useState } from 'react';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/useGameStore';
import { getAuthDisplayName } from '../../auth/session';
import { Button } from '../ui/Button';

const GameplayTestPanel = lazy(() =>
  import('../testing/GameplayTestPanel').then(module => ({
    default: module.GameplayTestPanel,
  }))
);

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
  const { isAuthenticated, isGuest, user, visitWebHatcheryLogin, logoutGuest } = useAuthStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTestPanel, setShowTestPanel] = useState(false);
  const accountName =
    user?.display_name ||
    user?.username ||
    getAuthDisplayName() ||
    (isAuthenticated ? 'Web Hatchery' : 'Not signed in');

  const handleResetClick = () => {
    setShowResetConfirm(true);
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
      <header className="frontier-command-bar px-4 lg:px-6 py-3 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg lg:text-xl font-frontier font-bold m-0 text-ember-enhanced">
            Ashes of Aeloria Campaign
          </h1>
          <div className="h-[2px] w-44 bg-gradient-to-r from-bronze-light to-transparent" />
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-start xl:justify-end">
          <span className="frontier-chip font-frontier font-bold px-3 py-1.5 text-xs lg:text-sm">
            {isGuest ? 'Guest' : 'Account'}: {accountName}
          </span>
          <span className="frontier-chip font-frontier font-bold px-3 py-1.5 text-xs lg:text-sm">
            Turn: {turn}
          </span>
          <span className="frontier-chip font-frontier font-bold px-3 py-1.5 text-xs lg:text-sm">
            Phase: Player
          </span>
          {isGuest && (
            <Button
              variant="secondary"
              size="sm"
              onClick={logoutGuest}
              className="text-xs lg:text-sm"
            >
              Exit Guest
            </Button>
          )}
          {!isAuthenticated && !isGuest && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void visitWebHatcheryLogin()}
              className="text-xs lg:text-sm"
            >
              Sign In
            </Button>
          )}
          {showMissionSelect && onReturnToMissionSelect && (
            <Button
              variant="primary"
              size="sm"
              onClick={onReturnToMissionSelect}
              className="text-xs lg:text-sm"
            >
              Mission Select
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
              Restart Mission
            </Button>
          )}
          {import.meta.env.DEV && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowTestPanel(true)}
              className="text-xs lg:text-sm"
              title="Open gameplay testing panel"
            >
              Balance Tests
            </Button>
          )}
          <Button
            variant="attack"
            size="sm"
            onClick={handleResetClick}
            className="text-xs lg:text-sm"
          >
            Reset Campaign
          </Button>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="frontier-panel p-6 lg:p-8 text-center w-full max-w-sm">
            <h2 className="text-xl lg:text-2xl mb-4 frontier-panel-title">Reset Campaign</h2>
            <p className="mb-6 text-parchment-light leading-normal text-sm lg:text-base font-parchment">
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
          <div className="frontier-panel w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-bronze">
              <h2 className="text-xl lg:text-2xl frontier-panel-title">Gameplay Balance Testing</h2>
              <Button
                variant="secondary"
                onClick={() => setShowTestPanel(false)}
                className="font-frontier font-bold"
              >
                Close
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Suspense
                fallback={
                  <div className="p-6 font-parchment text-parchment-light">
                    Loading balance tools...
                  </div>
                }
              >
                <GameplayTestPanel />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
