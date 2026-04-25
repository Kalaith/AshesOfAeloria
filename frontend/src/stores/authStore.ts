import { create } from 'zustand';
import { gameApi } from '../api/gameApi';
import type { AuthUser } from '../api/gameApi';
import {
  clearGuestSession,
  getActiveAuthToken,
  getFrontpageAuthToken,
  getGuestAuthToken,
  hasMergeableGuestSession,
  readGuestSession,
  saveGuestSession,
} from '../auth/session';
import { serializeGameState, useGameStore } from './useGameStore';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isGuest: boolean;
  hasMergeableGuestSession: boolean;
  user: AuthUser | null;
  error: string | null;
  loginUrl: string | null;
  initializeSession: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  mergeGuestSession: () => Promise<void>;
  visitWebHatcheryLogin: () => Promise<void>;
  saveCurrentGame: () => Promise<void>;
  logoutGuest: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  isSaving: false,
  isGuest: false,
  hasMergeableGuestSession: false,
  user: null,
  error: null,
  loginUrl: null,

  initializeSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = getActiveAuthToken();
      if (!token) {
        set({
          isAuthenticated: false,
          isGuest: false,
          hasMergeableGuestSession: hasMergeableGuestSession(),
          user: null,
          isLoading: false,
        });
        return;
      }

      const payload = await gameApi.loadGame();
      if (payload.game_state) {
        useGameStore.getState().loadGameState(payload.game_state);
      } else {
        await gameApi.saveGame(serializeGameState(useGameStore.getState()));
      }

      set({
        isAuthenticated: true,
        isGuest: payload.user.is_guest,
        hasMergeableGuestSession: hasMergeableGuestSession(),
        user: payload.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage(error),
        hasMergeableGuestSession: hasMergeableGuestSession(),
      });
    }
  },

  continueAsGuest: async () => {
    set({ isSaving: true, error: null });
    try {
      const existing = readGuestSession();
      if (!existing) {
        saveGuestSession(await gameApi.createGuestSession());
      }

      await get().initializeSession();
      set({ isSaving: false });
    } catch (error) {
      set({ isSaving: false, error: errorMessage(error) });
    }
  },

  mergeGuestSession: async () => {
    const guestToken = getGuestAuthToken();
    if (!getFrontpageAuthToken() || !guestToken) {
      set({ hasMergeableGuestSession: false });
      return;
    }

    set({ isSaving: true, error: null });
    try {
      const payload = await gameApi.linkGuestAccount(guestToken);
      clearGuestSession();
      if (payload.game_state) {
        useGameStore.getState().loadGameState(payload.game_state);
      }

      set({
        isAuthenticated: true,
        isGuest: false,
        hasMergeableGuestSession: false,
        user: payload.user,
        isSaving: false,
        error: null,
      });
    } catch (error) {
      set({ isSaving: false, error: errorMessage(error) });
    }
  },

  visitWebHatcheryLogin: async () => {
    set({ isSaving: true, error: null });
    try {
      const { login_url: loginUrl } = await gameApi.getLoginInfo();
      const targetUrl = withReturnTo(loginUrl);
      set({ isSaving: false, loginUrl: targetUrl });
      window.location.assign(targetUrl);
    } catch (error) {
      set({ isSaving: false, error: errorMessage(error) });
    }
  },

  saveCurrentGame: async () => {
    if (!get().isAuthenticated || get().isSaving) {
      return;
    }

    set({ isSaving: true });
    try {
      await gameApi.saveGame(serializeGameState(useGameStore.getState()));
      set({ isSaving: false, error: null });
    } catch (error) {
      set({ isSaving: false, error: errorMessage(error) });
    }
  },

  logoutGuest: () => {
    clearGuestSession();
    set({
      isAuthenticated: Boolean(getFrontpageAuthToken()),
      isGuest: false,
      hasMergeableGuestSession: hasMergeableGuestSession(),
      user: null,
    });
  },
}));

function withReturnTo(loginUrl: string): string {
  try {
    const url = new URL(loginUrl, window.location.origin);
    url.searchParams.set('redirect', window.location.href);
    return url.toString();
  } catch {
    return loginUrl;
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Backend request failed';
}
