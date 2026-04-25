import { apiClient } from './apiClient';
import { ApiError, ApiResponse } from './types';
import type { GameState } from '../types/game';

type HttpMethod = 'get' | 'post';

export interface AuthUser {
  id: string;
  email?: string | null;
  username?: string | null;
  display_name?: string | null;
  roles: string[];
  is_guest: boolean;
  auth_type: 'frontpage' | 'guest';
}

export interface GuestSession {
  token: string;
  user: AuthUser;
}

export interface GamePayload {
  user: AuthUser;
  game_state: Partial<GameState> | null;
  updated_at: string | null;
}

async function request<T>(method: HttpMethod, url: string, payload?: unknown): Promise<T> {
  try {
    const response =
      method === 'get'
        ? await apiClient.get<ApiResponse<T>>(url)
        : await apiClient.post<ApiResponse<T>>(url, payload);

    if (!response.data.success) {
      throw new ApiError(response.data.error || 'Backend request failed', response.status);
    }

    return response.data.data as T;
  } catch (error: unknown) {
    const maybeAxiosError = error as {
      response?: { status?: number; data?: { error?: string; message?: string } };
      message?: string;
    };
    const status = maybeAxiosError.response?.status ?? 500;
    const message =
      maybeAxiosError.response?.data?.error ||
      maybeAxiosError.response?.data?.message ||
      maybeAxiosError.message ||
      'Backend request failed';

    throw new ApiError(message, status);
  }
}

export const gameApi = {
  getLoginInfo: () => request<{ login_url: string }>('get', '/api/auth/login-info'),
  createGuestSession: () => request<GuestSession>('post', '/api/auth/guest-session'),
  linkGuestAccount: (guestToken: string) =>
    request<{ merged: boolean; user: AuthUser; game_state: Partial<GameState> | null; updated_at: string | null }>(
      'post',
      '/api/auth/link-guest',
      { guest_token: guestToken }
    ),
  loadGame: () => request<GamePayload>('get', '/api/game'),
  saveGame: (gameState: Partial<GameState>) =>
    request<GamePayload>('post', '/api/game/save', { game_state: gameState }),
};
