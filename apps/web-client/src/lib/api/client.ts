/**
 * AutoVerse AI — Axios API Client
 *
 * Configured Axios instance for communicating with the AutoVerse AI backend.
 *
 * Features:
 * - baseURL from environment configuration (no hardcoded URLs)
 * - Request interceptor: attaches Bearer token from localStorage
 * - Response interceptor: normalises errors + handles 401 token refresh
 * - 15-second timeout
 *
 * Per docs/Architecture.md (Cross-Cutting Concerns: Centralized API client
 * with interceptors for auth token refresh and normalized error handling).
 * Per docs/PROJECT_RULES.md Rule 20 (no hardcoded values).
 */

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/lib/config/env";
import { API_TIMEOUT_MS, STORAGE_KEYS } from "@/lib/constants";
import type { ApiError } from "@/types";

// ── Create Axios Instance ─────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-Version": "1",
  },
});

// ── Request Interceptor ───────────────────────────────────────────────────
/**
 * Attaches the JWT access token to every outgoing request.
 * Token is read from localStorage on each request (supports runtime rotation).
 * SSR-safe: skips localStorage access when `window` is not defined.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// ── Track refresh state — prevents refresh loops ──────────────────────────
let isRefreshing = false;
let refreshSubscribers: Array<(_token: string) => void> = [];

function subscribeToRefresh(cb: (_accessToken: string) => void): void {
  refreshSubscribers.push(cb);
}

function notifyRefreshSubscribers(accessToken: string): void {
  refreshSubscribers.forEach((cb) => cb(accessToken));
  refreshSubscribers = [];
}

// ── Response Interceptor ──────────────────────────────────────────────────
/**
 * Normalises API errors and handles 401 access-token expiry.
 *
 * On 401:
 *   1. Attempts to refresh using the stored refresh token.
 *   2. If successful: retries the original request with the new access token.
 *   3. If refresh fails: clears tokens (forces re-login).
 *
 * All error responses are mapped to a consistent shape matching ApiError.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 — access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      const refreshToken = window.localStorage.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
      );

      if (!refreshToken) {
        // No refresh token — clear auth and reject
        clearAuthTokens();
        return Promise.reject(normaliseError(error));
      }

      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve) => {
          subscribeToRefresh((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<{
          data: { access_token: string; refresh_token: string };
        }>(`${env.apiBaseUrl}/auth/refresh`, { refresh_token: refreshToken });

        const { access_token, refresh_token: newRefreshToken } = data.data;

        window.localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        window.localStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          newRefreshToken
        );

        apiClient.defaults.headers.Authorization = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        notifyRefreshSubscribers(access_token);
        isRefreshing = false;

        return apiClient(originalRequest);
      } catch {
        clearAuthTokens();
        isRefreshing = false;
        return Promise.reject(normaliseError(error));
      }
    }

    return Promise.reject(normaliseError(error));
  }
);

// ── Helpers ───────────────────────────────────────────────────────────────
function clearAuthTokens(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    window.localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    window.localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  }
}

/**
 * Maps an Axios error to a normalised `ApiError` object.
 * Covers network errors, timeouts, and structured backend errors.
 */
function normaliseError(error: AxiosError<ApiError>): ApiError {
  if (error.response?.data?.error) {
    return error.response.data;
  }

  if (error.code === "ECONNABORTED") {
    return {
      success: false,
      error: {
        code: "REQUEST_TIMEOUT",
        message: "The request timed out. Please try again.",
      },
      timestamp: new Date().toISOString(),
    };
  }

  if (!error.response) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: "Unable to reach the server. Check your connection.",
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: false,
    error: {
      code: `HTTP_${error.response.status}`,
      message: error.message || "An unexpected error occurred.",
    },
    timestamp: new Date().toISOString(),
  };
}

export { apiClient };
