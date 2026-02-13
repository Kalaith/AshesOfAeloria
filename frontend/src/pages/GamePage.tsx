/**
 * Main Game Page Component
 * Clean, modular architecture following frontend standards
 */

import React, { useState, useEffect } from "react";
import { GameLayout } from "../components/layout/GameLayout";
import { GameHeader } from "../components/layout/GameHeader";
import { MissionSelectionCanvas } from "../components/game/MissionSelectionCanvas";
import { GameCanvas } from "../components/game/GameCanvas";
import { EnhancedLeftPanel } from "../components/features/EnhancedLeftPanel";
import { EnhancedRightPanel } from "../components/features/EnhancedRightPanel";
import { GameOverModal } from "../components/features/GameOverModal";
import { RecruitmentModal } from "../components/game/RecruitmentModal";
import { HelpModal } from "../components/game/HelpModal";
import { StoryEventModal } from "../components/game/StoryEventModal";
import { ToastContainer } from "../components/ui/Toast";
import { useGameLogic } from "../hooks/useGameLogic";
import { useGameStore } from "../stores/useGameStore";
import { useNotifications } from "../hooks/useNotifications";
import { useModals } from "../hooks/useModals";

/**
 * Game Page Component
 * Separated from App for cleaner Provider wrapping
 */
export const GamePage: React.FC = () => {
  const [gameMode, setGameMode] = useState<"mission-select" | "active-mission">(
    "mission-select",
  );
  const [storyEventModalOpen, setStoryEventModalOpen] = useState(false);
  const { gameOver, winner } = useGameLogic();
  const initializeMission = useGameStore((state) => state.initializeMission);
  const endMission = useGameStore((state) => state.endMission);
  const missionStarted = useGameStore((state) => state.missionStarted);
  const currentMission = useGameStore((state) => state.currentMission);
  const events = useGameStore((state) => state.events);
  const respondToEvent = useGameStore((state) => state.respondToEvent);
  const { notifications, removeNotification } = useNotifications();
  const { modals, openRecruitment, closeRecruitment, openHelp, closeHelp } =
    useModals();

  const handleMissionStart = (missionId: string) => {
    console.log("Starting mission:", missionId);
    // Initialize the mission with campaign-specific parameters
    initializeMission(missionId);
    setGameMode("active-mission");
  };

  const handleReturnToMissionSelect = () => {
    endMission();
    setGameMode("mission-select");
  };

  const handleRestartMission = () => {
    if (currentMission) {
      initializeMission(currentMission);
    }
  };

  // Restore game mode based on persisted mission state
  useEffect(() => {
    if (missionStarted && currentMission) {
      setGameMode("active-mission");
    } else {
      setGameMode("mission-select");
    }
  }, [missionStarted, currentMission]);

  // Monitor for new story events
  useEffect(() => {
    if (events.length > 0 && !storyEventModalOpen) {
      setStoryEventModalOpen(true);
    }
  }, [events.length, storyEventModalOpen]);

  // Story event handlers
  const handleStoryEventChoice = (eventId: string, choiceId: string) => {
    respondToEvent(eventId, choiceId);
    setStoryEventModalOpen(false);
  };

  const handleCloseStoryEvent = () => {
    setStoryEventModalOpen(false);
  };

  // Mission Selection Mode: Clean interface without battle UI
  if (gameMode === "mission-select") {
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
            currentMission={currentMission}
            onRestartMission={handleRestartMission}
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
      <GameOverModal isOpen={gameOver} winner={winner} />

      <RecruitmentModal
        isOpen={modals.recruitment}
        onClose={closeRecruitment}
      />

      <HelpModal isOpen={modals.help} onClose={closeHelp} />

      <StoryEventModal
        event={events.length > 0 ? events[0] : null}
        isOpen={storyEventModalOpen}
        onClose={handleCloseStoryEvent}
        onChoiceSelected={handleStoryEventChoice}
      />

      {/* Toast Notifications */}
      <ToastContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </>
  );
};
