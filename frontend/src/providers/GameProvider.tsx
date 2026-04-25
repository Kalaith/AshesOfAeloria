/* eslint-disable react-refresh/only-export-components */
/**
 * Game Provider Component
 * Provides global context and state management for the game
 */

import React, { createContext, useContext, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import type { Notification } from '../hooks/useNotifications';
import { useAuthStore } from '../stores/authStore';
import { useGameStore } from '../stores/useGameStore';

interface GameContextType {
  // Notification system
  notifications: Notification[];
  showSuccess: (message: string, duration?: number) => string;
  showError: (message: string, duration?: number) => string;
  showWarning: (message: string, duration?: number) => string;
  showInfo: (message: string, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const {
    notifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();

  const contextValue: GameContextType = {
    notifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAllNotifications,
  };

  useEffect(() => {
    void useAuthStore.getState().initializeSession();

    let saveTimer: number | null = null;
    const unsubscribe = useGameStore.subscribe(() => {
      const auth = useAuthStore.getState();
      if (!auth.isAuthenticated || auth.isLoading) {
        return;
      }

      if (saveTimer !== null) {
        window.clearTimeout(saveTimer);
      }

      saveTimer = window.setTimeout(() => {
        void useAuthStore.getState().saveCurrentGame();
      }, 1200);
    });

    return () => {
      if (saveTimer !== null) {
        window.clearTimeout(saveTimer);
      }
      unsubscribe();
    };
  }, []);

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};
