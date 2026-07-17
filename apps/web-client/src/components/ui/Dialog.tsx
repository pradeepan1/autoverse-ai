"use client";

/**
 * AutoVerse AI — Dialog Component
 *
 * Accessible, declarative modal dialog.
 *
 * Use this for inline/declarative usage (controlled by `isOpen` prop).
 * For imperative usage (open programmatically), use `useModal()` from ModalProvider.
 *
 * Features:
 * - Portal-rendered (outside DOM hierarchy)
 * - Backdrop blur with click-outside dismissal
 * - Focus trap: first focusable element receives focus on open
 * - Escape key dismissal
 * - Scroll lock on body
 * - `motion-slow` scale-in entrance animation
 * - Accessible: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`
 * - 5 sizes: sm | md | lg | xl | fullscreen
 *
 * Per docs/UI_UX_Guidelines.md §12 (Animations) and §16 (Accessibility).
 * Per docs/PROJECT_RULES.md Rule 17 (reusable, composable).
 */

import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils/cn";
import type { DialogSize } from "@/types";

// ── Props ─────────────────────────────────────────────────────────────────
interface DialogProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when dialog requests closure (Escape, backdrop click, close button) */
  onClose: () => void;
  /** Dialog title — required for accessibility (`aria-labelledby`) */
  title: string;
  /** Optional description (`aria-describedby`) */
  description?: string;
  /** Size variant */
  size?: DialogSize;
  /** Hide the built-in title/description header area */
  hideHeader?: boolean;
  className?: string;
  children: ReactNode;
}

// ── Size map ──────────────────────────────────────────────────────────────
const sizeMap: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  fullscreen: "max-w-none w-full h-full rounded-none m-0",
};

// ── Focusable element selector ─────────────────────────────────────────────
const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ── Component ─────────────────────────────────────────────────────────────
export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  hideHeader = false,
  className,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = `dialog-title-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const descId = description
    ? `dialog-desc-${title.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  // Focus trap: focus first focusable element on open
  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;

    const dialog = dialogRef.current;
    if (dialog) {
      const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
      focusable[0]?.focus();
    }

    return () => previousFocus?.focus?.();
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Tab focus trap
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative z-10 w-full bg-[var(--bg-elevated)]",
          "border border-[var(--border-color)] rounded-xl shadow-xl",
          "animate-scale-in focus:outline-none",
          sizeMap[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-start justify-between gap-4 p-6 border-b border-[var(--border-color)]">
            <div>
              <h2
                id={titleId}
                className="text-h4 font-semibold text-[var(--text-primary)]"
              >
                {title}
              </h2>
              {description && (
                <p
                  id={descId}
                  className="text-sm text-[var(--text-secondary)] mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className={cn(
                "flex-shrink-0 rounded-lg p-2 -m-1",
                "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                "hover:bg-[var(--bg-secondary)]",
                "transition-colors duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              )}
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
