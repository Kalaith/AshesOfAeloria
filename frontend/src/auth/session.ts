import type { GuestSession } from '../api/gameApi';
import type { AuthUser } from '../api/gameApi';

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

export function getAuthDisplayName(): string | null {
  try {
    const frontpageUser = readFrontpageAuthUser();
    if (frontpageUser) {
      return frontpageUser.display_name || frontpageUser.username || frontpageUser.email || null;
    }

    const guestUser = readGuestSession()?.user;
    return guestUser?.display_name || guestUser?.username || null;
  } catch {
    return null;
  }
}

function readFrontpageAuthUser(): Pick<AuthUser, 'email' | 'username' | 'display_name'> | null {
  const raw = localStorage.getItem(FRONTPAGE_AUTH_KEY);
  const parsed = raw
    ? (JSON.parse(raw) as {
        state?: {
          token?: string;
          user?: {
            email?: string | null;
            username?: string | null;
            display_name?: string | null;
            is_guest?: boolean;
          };
          isGuest?: boolean;
        };
      })
    : null;
  const isGuestToken = Boolean(parsed?.state?.user?.is_guest || parsed?.state?.isGuest);
  return !isGuestToken && typeof parsed?.state?.token === 'string'
    ? (parsed.state.user ?? null)
    : null;
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
