/**
 * Main Game Page Component
 * Clean, modular architecture following frontend standards
 */

import React, { useState, useEffect } from 'react';
import { GameHeader } from '../components/layout/GameHeader';
import { MissionSelectionCanvas } from '../components/game/MissionSelectionCanvas';
import { ActiveCampaignHud } from '../components/game/ActiveCampaignHud';
import { GameOverModal } from '../components/features/GameOverModal';
import { RecruitmentModal } from '../components/game/RecruitmentModal';
import { HelpModal } from '../components/game/HelpModal';
import { StoryEventModal } from '../components/game/StoryEventModal';
import { ToastContainer } from '../components/ui/Toast';
import { useGameLogic } from '../hooks/useGameLogic';
import { useAuthStore } from '../stores/authStore';
import { useGameStore } from '../stores/useGameStore';
import { useNotifications } from '../hooks/useNotifications';
import { useModals } from '../hooks/useModals';
import { getAuthDisplayName } from '../auth/session';

const ENTERED_GAME_SESSION_KEY = 'ashes-of-aeloria-entered-game';

/**
 * Game Page Component
 * Separated from App for cleaner Provider wrapping
 */
export const GamePage: React.FC = () => {
  const [gameMode, setGameMode] = useState<'mission-select' | 'active-mission'>('mission-select');
  const [hasEnteredGame, setHasEnteredGame] = useState(readEnteredGameSession);
  const [storyEventModalOpen, setStoryEventModalOpen] = useState(false);
  const { gameOver, winner } = useGameLogic();
  const initializeMission = useGameStore(state => state.initializeMission);
  const endMission = useGameStore(state => state.endMission);
  const missionStarted = useGameStore(state => state.missionStarted);
  const currentMission = useGameStore(state => state.currentMission);
  const events = useGameStore(state => state.events);
  const respondToEvent = useGameStore(state => state.respondToEvent);
  const { notifications, removeNotification } = useNotifications();
  const { modals, openRecruitment, closeRecruitment, openHelp, closeHelp } = useModals();
  const {
    isAuthenticated,
    isLoading,
    isSaving,
    isGuest,
    hasMergeableGuestSession,
    user,
    error,
    continueAsGuest,
    mergeGuestSession,
    visitWebHatcheryLogin,
  } = useAuthStore();

  const handleMissionStart = (missionId: string) => {
    console.log('Starting mission:', missionId);
    // Initialize the mission with campaign-specific parameters
    initializeMission(missionId);
    rememberEnteredGame();
    setGameMode('active-mission');
  };

  const handleReturnToMissionSelect = () => {
    endMission();
    setGameMode('mission-select');
  };

  const handleRestartMission = () => {
    if (currentMission) {
      initializeMission(currentMission);
    }
  };

  const handleContinueAsGuest = async () => {
    await continueAsGuest();
    if (useAuthStore.getState().isAuthenticated) {
      rememberEnteredGame();
      setHasEnteredGame(true);
    }
  };

  const handleContinueCampaign = () => {
    rememberEnteredGame();
    setHasEnteredGame(true);
  };

  useEffect(() => {
    if (isAuthenticated && missionStarted && currentMission) {
      rememberEnteredGame();
      setHasEnteredGame(true);
      setGameMode('active-mission');
    }
  }, [isAuthenticated, missionStarted, currentMission]);

  // Restore game mode based on persisted mission state
  useEffect(() => {
    if (missionStarted && currentMission) {
      setGameMode('active-mission');
    } else {
      setGameMode('mission-select');
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
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-texture px-6">
        <div className="bg-metal-texture border-4 border-bronze rounded-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-frontier font-bold text-ember-enhanced mb-3">
            Ashes of Aeloria
          </h1>
          <p className="text-light-enhanced font-parchment">Loading saved campaign...</p>
        </div>
      </div>
    );
  }

  if (!hasEnteredGame) {
    return (
      <LandingPage
        isAuthenticated={isAuthenticated}
        isGuest={isGuest}
        isSaving={isSaving}
        hasMergeableGuestSession={hasMergeableGuestSession}
        userName={user?.display_name || user?.username || getAuthDisplayName()}
        error={error}
        onContinueCampaign={handleContinueCampaign}
        onContinueAsGuest={() => void handleContinueAsGuest()}
        onMergeGuestSession={() => void mergeGuestSession()}
        onVisitLogin={() => void visitWebHatcheryLogin()}
      />
    );
  }

  if (gameMode === 'mission-select') {
    return (
      <>
        <div className="h-screen flex flex-col">
          {hasMergeableGuestSession ? (
            <div className="bg-ember text-iron-dark px-4 py-2 flex items-center justify-center gap-3 font-frontier font-bold">
              <span>Guest progress is available on this browser.</span>
              <button
                type="button"
                onClick={() => void mergeGuestSession()}
                disabled={isSaving}
                className="rounded-md border-2 border-iron px-3 py-1 disabled:opacity-60"
              >
                {isSaving ? 'Merging...' : 'Merge Guest Progress'}
              </button>
            </div>
          ) : null}
          {isGuest ? (
            <div className="bg-bronze text-light-enhanced px-4 py-2 text-center font-parchment">
              Guest campaign: {user?.display_name || user?.username || 'Guest'}
            </div>
          ) : null}
          <GameHeader />
          <div className="flex-1 overflow-hidden">
            <MissionSelectionCanvas onMissionStart={handleMissionStart} />
          </div>
        </div>

        {/* Toast Notifications */}
        <ToastContainer notifications={notifications} onClose={removeNotification} />
      </>
    );
  }

  // Active Mission Mode: Full battle interface
  return (
    <>
      <ActiveCampaignHud
        currentMission={currentMission}
        onReturnToMissionSelect={handleReturnToMissionSelect}
        onRestartMission={handleRestartMission}
        onRecruitClick={openRecruitment}
        onHelpClick={openHelp}
      />

      {/* Modals */}
      <GameOverModal isOpen={gameOver} winner={winner} />

      <RecruitmentModal isOpen={modals.recruitment} onClose={closeRecruitment} />

      <HelpModal isOpen={modals.help} onClose={closeHelp} />

      <StoryEventModal
        event={events.length > 0 ? events[0] : null}
        isOpen={storyEventModalOpen}
        onClose={handleCloseStoryEvent}
        onChoiceSelected={handleStoryEventChoice}
      />

      {/* Toast Notifications */}
      <ToastContainer notifications={notifications} onClose={removeNotification} />
    </>
  );
};

function readEnteredGameSession(): boolean {
  try {
    return sessionStorage.getItem(ENTERED_GAME_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

function rememberEnteredGame(): void {
  try {
    sessionStorage.setItem(ENTERED_GAME_SESSION_KEY, 'true');
  } catch {
    // Session storage is only a refresh convenience; the backend remains authoritative.
  }
}

interface LandingPageProps {
  isAuthenticated: boolean;
  isGuest: boolean;
  isSaving: boolean;
  hasMergeableGuestSession: boolean;
  userName: string | null;
  error: string | null;
  onContinueCampaign: () => void;
  onContinueAsGuest: () => void;
  onMergeGuestSession: () => void;
  onVisitLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  isAuthenticated,
  isGuest,
  isSaving,
  hasMergeableGuestSession,
  userName,
  error,
  onContinueCampaign,
  onContinueAsGuest,
  onMergeGuestSession,
  onVisitLogin,
}) => {
  return (
    <div className="min-h-screen bg-stone-texture px-4 py-8 text-light-enhanced overflow-y-auto">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="border-4 border-bronze bg-metal-texture rounded-lg p-6 sm:p-8 shadow-2xl">
            <p className="font-frontier text-sm uppercase tracking-wide text-amber-light mb-3">
              Reconstruction command
            </p>
            <h1 className="text-4xl sm:text-5xl font-frontier font-bold text-ember-enhanced mb-4">
              Ashes of Aeloria
            </h1>
            <p className="font-parchment text-lg text-light-enhanced leading-relaxed max-w-2xl">
              Rebuild the fallen realm, choose your allegiance, and carry your campaign through Web
              Hatchery saves or a guest session on this browser.
            </p>
          </section>

          <section className="border-4 border-bronze bg-iron-dark/95 rounded-lg p-5 sm:p-6 shadow-2xl">
            {isAuthenticated ? (
              <div className="mb-5 rounded-md border-2 border-bronze bg-stone-900/70 px-4 py-3 font-parchment text-light-enhanced">
                {isGuest ? 'Guest campaign' : 'Signed in'}
                {userName ? ` as ${userName}` : ''}.
              </div>
            ) : null}

            {error ? (
              <p className="mb-4 rounded-md border-2 border-red-700 bg-red-950/50 px-3 py-2 text-red-100">
                {error}
              </p>
            ) : null}

            <div className="space-y-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={onContinueCampaign}
                  disabled={isSaving}
                  className="w-full rounded-md bg-ember px-4 py-3 font-frontier font-bold text-iron-dark transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  Continue Campaign
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onContinueAsGuest}
                  disabled={isSaving}
                  className="w-full rounded-md bg-ember px-4 py-3 font-frontier font-bold text-iron-dark transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  {isSaving ? 'Opening Guest Campaign...' : 'Continue as Guest'}
                </button>
              )}

              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={onVisitLogin}
                  disabled={isSaving}
                  className="w-full rounded-md border-2 border-bronze px-4 py-3 font-frontier font-bold text-light-enhanced transition hover:bg-bronze/30 disabled:cursor-wait disabled:opacity-60"
                >
                  {isSaving ? 'Opening Login...' : 'Sign in with Web Hatchery'}
                </button>
              ) : null}

              {hasMergeableGuestSession ? (
                <button
                  type="button"
                  onClick={onMergeGuestSession}
                  disabled={isSaving}
                  className="w-full rounded-md border-2 border-amber-400 bg-amber-500/10 px-4 py-3 font-frontier font-bold text-amber-200 transition hover:bg-amber-500/20 disabled:cursor-wait disabled:opacity-60"
                >
                  {isSaving ? 'Merging Guest Progress...' : 'Merge Guest Progress'}
                </button>
              ) : null}
            </div>

            {isGuest ? (
              <p className="mt-4 font-parchment text-sm text-light-enhanced/80">
                Guest progress stays on this browser until it is linked to a Web Hatchery account.
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};
