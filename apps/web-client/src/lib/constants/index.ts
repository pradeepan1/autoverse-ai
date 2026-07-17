/**
 * AutoVerse AI — Application Constants
 *
 * Centralised constants used across the frontend application.
 * No hardcoded values in components — always import from here.
 * Per docs/PROJECT_RULES.md Rule 20.
 */

import { env } from "@/lib/config/env";

// ── Application ───────────────────────────────────────────────────────────
export const APP_NAME = env.appName;
export const APP_VERSION = "0.1.0";
export const API_VERSION = "v1";

// ── API ───────────────────────────────────────────────────────────────────
export const API_BASE_URL = env.apiBaseUrl;
export const API_TIMEOUT_MS = 15_000; // 15 seconds

// ── Routes ────────────────────────────────────────────────────────────────
/**
 * Centralized route constants.
 * Never hardcode paths in components — import from ROUTES.
 */
export const ROUTES = {
  // Public
  HOME: "/",
  SEARCH: "/search",
  CAR_DETAILS: (id: string) => `/cars/${id}`,
  COMPARE: "/compare",
  RENTALS: "/rentals",
  RENTAL_DETAILS: (id: string) => `/rentals/${id}`,

  // Auth (Module 02)
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // Buyer
  WISHLIST: "/wishlist",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  BOOKINGS: "/dashboard/bookings",

  // Dealer
  DEALER_DASHBOARD: "/dealer",
  DEALER_LISTINGS: "/dealer/listings",
  DEALER_LEADS: "/dealer/leads",
  DEALER_ANALYTICS: "/dealer/analytics",

  // Admin
  ADMIN_DASHBOARD: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_LISTINGS: "/admin/listings",
  ADMIN_ANALYTICS: "/admin/analytics",
} as const;

// ── Breakpoints — must mirror tailwind.config.ts ──────────────────────────
export const BREAKPOINTS = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

// ── Pagination ────────────────────────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100,
} as const;

// ── Local Storage Keys ────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  THEME: "av_theme",
  ACCESS_TOKEN: "av_access_token",
  REFRESH_TOKEN: "av_refresh_token",
  USER_PROFILE: "av_user_profile",
  COMPARE_LIST: "av_compare_list",
  SEARCH_HISTORY: "av_search_history",
} as const;

// ── Toast ─────────────────────────────────────────────────────────────────
export const TOAST_DEFAULTS = {
  DURATION_MS: 5_000,
  MAX_VISIBLE: 5,
} as const;

// ── Images ────────────────────────────────────────────────────────────────
export const IMAGE_ASPECT_RATIOS = {
  LISTING_CARD: "16/9",
  LISTING_HERO: "21/9",
  AVATAR: "1/1",
} as const;

export const IMAGE_PLACEHOLDER = "/images/car-placeholder.svg";

// ── Navbar ────────────────────────────────────────────────────────────────
export const NAVBAR_HEIGHT_PX = 64;

// ── Sidebar ───────────────────────────────────────────────────────────────
export const SIDEBAR_WIDTH_PX = 240;
export const SIDEBAR_COLLAPSED_WIDTH_PX = 64;

// ── Car Comparison ────────────────────────────────────────────────────────
export const MAX_COMPARISON_CARS = 4;

// ── Validation ────────────────────────────────────────────────────────────
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 100,
  PHONE_REGEX: /^\+?[1-9]\d{6,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// ── Animation Durations (ms) — mirror tailwind transitionDuration ─────────
export const MOTION = {
  FAST: 150,
  BASE: 250,
  SLOW: 400,
} as const;
