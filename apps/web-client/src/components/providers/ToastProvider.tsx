"use client";

/**
 * AutoVerse AI — ToastProvider
 *
 * Context + `useToast()` hook for application-wide toast notifications.
 *
 * Features:
 * - 4 variants: success, error, warning, info
 * - Portal-rendered toast stack (bottom-right desktop, bottom mobile)
 * - Auto-dismiss with configurable duration (0 = persistent)
 * - Maximum 5 visible toasts; oldest dismissed when limit exceeded
 * - Accessible: `role="status"` / `aria-live="polite"` region
 * - Respects `prefers-reduced-motion` (no slide animation)
 *
 * Per docs/UI_UX_Guidelines.md §12 (Animations) and §16 (Accessibility).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { TOAST_DEFAULTS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";
import type { Toast, ToastVariant } from "@/types";

// ── Toast Context ─────────────────────────────────────────────────────────
interface ToastContextValue {
  /** Show a toast notification */
  toast: (options: Omit<Toast, "id">) => string;
  /** Dismiss a specific toast by id */
  dismiss: (id: string) => void;
  /** Dismiss all visible toasts */
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ── Toast Icons ───────────────────────────────────────────────────────────
function ToastIcon({ variant }: { variant: ToastVariant }) {
  const base = "w-5 h-5 flex-shrink-0";
  switch (variant) {
    case "success":
      return (
        <svg className={cn(base, "text-success")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      );
    case "error":
      return (
        <svg className={cn(base, "text-error")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
        </svg>
      );
    case "warning":
      return (
        <svg className={cn(base, "text-warning")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
    case "info":
    default:
      return (
        <svg className={cn(base, "text-info")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
      );
  }
}

// ── Individual Toast Item ─────────────────────────────────────────────────
interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const duration = toast.duration ?? TOAST_DEFAULTS.DURATION_MS;
    if (duration === 0) return;

    timerRef.current = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex items-start gap-3 w-full max-w-sm rounded-lg p-4 shadow-lg border",
        "bg-[var(--bg-elevated)] border-[var(--border-color)]",
        "animate-toast-slide-in"
      )}
    >
      <ToastIcon variant={toast.variant} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
          {toast.title}
        </p>
        {toast.description && (
          <p className="text-sm text-[var(--text-secondary)] mt-0.5 leading-snug">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className={cn(
          "flex-shrink-0 rounded-md p-0.5 transition-colors duration-fast",
          "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        )}
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
        </svg>
      </button>
    </div>
  );
}

// ── Provider ──────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toast = useCallback((options: Omit<Toast, "id">): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => {
      const next = [...prev, { ...options, id }];
      // Cap at TOAST_DEFAULTS.MAX_VISIBLE — remove oldest
      return next.slice(-TOAST_DEFAULTS.MAX_VISIBLE);
    });
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-label="Notifications"
            className={cn(
              "fixed z-50 flex flex-col gap-2 pointer-events-none",
              // Bottom-right on desktop, bottom-center on mobile
              "bottom-4 right-4 sm:bottom-6 sm:right-6",
              "w-[calc(100vw-2rem)] sm:w-auto"
            )}
          >
            {toasts.map((t) => (
              <div key={t.id} className="pointer-events-auto">
                <ToastItem toast={t} onDismiss={dismiss} />
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
/**
 * Access the toast notification system.
 * Must be used within a `ToastProvider` subtree.
 *
 * @example
 * const { toast } = useToast();
 * toast({ variant: "success", title: "Saved!", description: "Your changes are saved." });
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
