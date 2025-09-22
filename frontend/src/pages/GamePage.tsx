/**
 * Main Game Page Component
 * Clean, modular architecture following frontend standards
 */

import React, { useState } from 'react';
import { GameLayout } from '../components/layout/GameLayout';
import { GameHeader } from '../components/layout/GameHeader';
import { MissionSelectionCanvas } from '../components/game/MissionSelectionCanvas';
import { GameCanvas } from '../components/game/GameCanvas';
import { EnhancedLeftPanel } from '../components/features/EnhancedLeftPanel';
import { EnhancedRightPanel } from '../components/features/EnhancedRightPanel';
import { GameOverModal } from '../components/features/GameOverModal';
import { RecruitmentModal } from '../components/game/RecruitmentModal';
import { HelpModal } from '../components/game/HelpModal';
import { ToastContainer } from '../components/ui/Toast';
import { useGameLogic } from '../hooks/useGameLogic';
import { useNotifications } from '../hooks/useNotifications';
import { useModals } from '../hooks/useModals';

/**
 * Game Page Component
 * Separated from App for cleaner Provider wrapping
 */
export const GamePage: React.FC = () => {
  const [gameMode, setGameMode] = useState<'mission-select' | 'active-mission'>('mission-select');
  const { gameOver, winner } = useGameLogic();
  const { notifications, removeNotification } = useNotifications();
  const {
    modals,
    openRecruitment,
    closeRecruitment,
    openHelp,
    closeHelp
  } = useModals();

  const handleMissionStart = (missionId: string) => {
    // TODO: Initialize mission with specific parameters
    console.log('Starting mission:', missionId);
    setGameMode('active-mission');
  };

  const handleReturnToMissionSelect = () => {
    setGameMode('mission-select');
  };

  // Mission Selection Mode: Clean interface without battle UI
  if (gameMode === 'mission-select') {
    return (
      <>
        <div className="h-screen flex flex-col">
          <GameHeader />
          <div className="flex-1 overflow-hidden">
            <MissionSelectionCanvas onMissionStart={handleMissionStart} />
          </div>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          notifications={notifications}
          onClose={removeNotification}
        />
      </>
    );
  }

  // Active Mission Mode: Full battle interface
  return (
    <>
      <GameLayout
        header={
          <GameHeader
            showMissionSelect={true}
            onReturnToMissionSelect={handleReturnToMissionSelect}
          />
        }
        leftPanel={
          <EnhancedLeftPanel
            onRecruitClick={openRecruitment}
            onHelpClick={openHelp}
          />
        }
        mainContent={<GameCanvas />}
        rightPanel={<EnhancedRightPanel />}
      />

      {/* Modals */}
      <GameOverModal
        isOpen={gameOver}
        winner={winner}
      />

      <RecruitmentModal
        isOpen={modals.recruitment}
        onClose={closeRecruitment}
      />

      <HelpModal
        isOpen={modals.help}
        onClose={closeHelp}
      />

      {/* Toast Notifications */}
      <ToastContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </>
  );
};