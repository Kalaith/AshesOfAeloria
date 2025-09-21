/**
 * Main Game Page Component
 * Clean, modular architecture following frontend standards
 */

import React, { useState } from 'react';
import { GameLayout } from '../components/layout/GameLayout';
import { GameHeader } from '../components/layout/GameHeader';
import { GameCanvas } from '../components/game/GameCanvas';
import { EnhancedLeftPanel } from '../components/features/EnhancedLeftPanel';
import { EnhancedRightPanel } from '../components/features/EnhancedRightPanel';
import { GameOverModal } from '../components/features/GameOverModal';
import { RecruitmentModal } from '../components/game/RecruitmentModal';
import { HelpModal } from '../components/game/HelpModal';
import { CampaignPage } from '../components/game/CampaignPage';
import { ToastContainer } from '../components/ui/Toast';
import { useGameLogic } from '../hooks/useGameLogic';
import { useNotifications } from '../hooks/useNotifications';
import { useModals } from '../hooks/useModals';

/**
 * Game Page Component
 * Separated from App for cleaner Provider wrapping
 */
export const GamePage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'game' | 'campaign'>('game');
  const { gameOver, winner } = useGameLogic();
  const { notifications, removeNotification } = useNotifications();
  const {
    modals,
    openRecruitment,
    closeRecruitment,
    openHelp,
    closeHelp
  } = useModals();

  const handleViewChange = (view: 'game' | 'campaign') => {
    setCurrentView(view);
  };

  if (currentView === 'campaign') {
    return (
      <>
        <div className="h-screen flex flex-col">
          <GameHeader
            currentView={currentView}
            onViewChange={handleViewChange}
          />
          <div className="flex-1 overflow-hidden">
            <CampaignPage />
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

  return (
    <>
      <GameLayout
        header={
          <GameHeader
            currentView={currentView}
            onViewChange={handleViewChange}
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