import type { GuestSession } from '../api/gameApi';

const GUEST_SESSION_KEY = 'ashes-of-aeloria-guest-session';
const FRONTPAGE_AUTH_KEY = 'auth-storage';

export function getActiveAuthToken(): string | null {
  return getFrontpageAuthToken() ?? getGuestAuthToken();
}

export function getFrontpageAuthToken(): string | null {
  try {
    const raw = localStorage.getItem(FRONTPAGE_AUTH_KEY);
    const parsed = raw
      ? (JSON.parse(raw) as {
          state?: { token?: string; user?: { is_guest?: boolean }; isGuest?: boolean };
        })
      : null;
    const isGuestToken = Boolean(parsed?.state?.user?.is_guest || parsed?.state?.isGuest);
    return !isGuestToken && typeof parsed?.state?.token === 'string' ? parsed.state.token : null;
  } catch {
    return null;
  }
}

export function getGuestAuthToken(): string | null {
  return readGuestSession()?.token ?? null;
}

export function readGuestSession(): GuestSession | null {
  try {
    const raw = localStorage.getItem(GUEST_SESSION_KEY);
    const parsed = raw ? (JSON.parse(raw) as GuestSession) : null;
    return parsed?.token && parsed?.user?.id ? parsed : null;
  } catch {
    return null;
  }
}

export function saveGuestSession(session: GuestSession): void {
  localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session));
}

export function clearGuestSession(): void {
  localStorage.removeItem(GUEST_SESSION_KEY);
}

export function hasMergeableGuestSession(): boolean {
  return Boolean(getFrontpageAuthToken() && getGuestAuthToken());
}
