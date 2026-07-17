/**
 * AutoVerse AI — Shared TypeScript Types
 *
 * Centralised type definitions shared across the entire frontend application.
 * Per docs/Architecture.md (Frontend Architecture) and docs/PROJECT_RULES.md Rule 11.
 * No `any` types — all types must be explicit and meaningful.
 */

// ── Generic API Response Envelope ─────────────────────────────────────────
/**
 * Standard success response from the AutoVerse AI backend.
 * All API responses are wrapped in this envelope per docs/API.md conventions.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Paginated list response from the backend.
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    per_page: number;
    pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  message?: string;
  timestamp: string;
}

/**
 * Standard error response from the backend.
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

// ── User & RBAC ───────────────────────────────────────────────────────────
/**
 * User roles per docs/SRS.md and docs/API.md (Authentication).
 */
export type UserRole = "buyer" | "dealer" | "admin" | "support";

/**
 * Authenticated user profile shape.
 */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  is_verified: boolean;
  created_at: string;
}

// ── Theme ─────────────────────────────────────────────────────────────────
/**
 * Available theme modes.
 * 'system' defers to prefers-color-scheme.
 */
export type ThemeMode = "light" | "dark" | "system";

// ── Common UI Prop Types ───────────────────────────────────────────────────
/** Allows className override on any component. */
export type ClassName = {
  className?: string;
};

/** Children prop shorthand. */
export type WithChildren = {
  children: React.ReactNode;
};

/** Optional children prop shorthand. */
export type WithOptionalChildren = {
  children?: React.ReactNode;
};

// ── Component Sizes ───────────────────────────────────────────────────────
export type ComponentSize = "sm" | "md" | "lg";

// ── Component Variants ────────────────────────────────────────────────────
export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type AlertVariant = "info" | "success" | "warning" | "error";
export type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

// ── Toast ─────────────────────────────────────────────────────────────────
export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number; // ms; 0 = persistent
}

// ── Navigation ────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ── Pagination ────────────────────────────────────────────────────────────
export interface PaginationParams {
  page: number;
  per_page: number;
}

// ── Sort ──────────────────────────────────────────────────────────────────
export type SortDirection = "asc" | "desc";

export interface SortParams {
  sort_by: string;
  sort_order: SortDirection;
}

// ── Base Entity ───────────────────────────────────────────────────────────
/**
 * Common fields on all persistent entities.
 */
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}
