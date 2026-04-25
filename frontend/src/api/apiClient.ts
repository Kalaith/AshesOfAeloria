import axios from 'axios';
import { getActiveAuthToken } from '../auth/session';

const requiredEnv = (key: keyof ImportMetaEnv): string => {
    const value = import.meta.env[key];
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

const BASE_URL = requiredEnv('VITE_API_BASE_URL');
const WEB_HATCHERY_LOGIN_URL = requiredEnv('VITE_WEB_HATCHERY_LOGIN_URL');

/**
 * Standardized Web Hatchery Axios Instance
 * Automatically handles Bearer tokens and 401 Unauthorized redirects.
 */
export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
    (config) => {
        const token = getActiveAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401s and standardize errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Intercept 401 Unauthorized and redirect to central login
        if (error.response?.status === 401) {
            const loginUrl =
                error.response?.data?.login_url ||
                WEB_HATCHERY_LOGIN_URL;

            if (loginUrl) {
                try {
                    const raw = localStorage.getItem('auth-storage');
                    const parsed = raw ? JSON.parse(raw) : {};
                    const state = parsed?.state ?? {};
                    const next = {
                        ...parsed,
                        state: {
                            ...state,
                            loginUrl,
                        },
                    };
                    localStorage.setItem('auth-storage', JSON.stringify(next));
                    window.dispatchEvent(new CustomEvent('webhatchery:login-required', { detail: { loginUrl } }));
                } catch (storageError) {
                    console.warn('Failed to persist login URL to auth storage', storageError);
                }
            }
        }
        return Promise.reject(error);
    }
);
