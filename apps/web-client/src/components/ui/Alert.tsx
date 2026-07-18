"use client";

/**
 * AutoVerse AI — Alert Component
 *
 * Inline contextual feedback component for displaying status messages.
 *
 * Variants: info | success | warning | error
 *
 * Features:
 * - Icon + heading + description layout
 * - Dismissible (optional)
 * - `role="alert"` for screen readers
 * - Status never conveyed by color alone (icon always present)
 *
 * Per docs/UI_UX_Guidelines.md §5 (Colors) and §16 (Accessibility).
 */

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { AlertVariant } from "@/types";

// ── Icons ─────────────────────────────────────────────────────────────────
function AlertIcon({ variant }: { variant: AlertVariant }) {
  switch (variant) {
    case "success":
      return (
        <svg className="w-5 h-5 flex-shrink-0 text-success dark:text-success-dark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      );
    case "warning":
      return (
        <svg className="w-5 h-5 flex-shrink-0 text-warning dark:text-warning-dark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
    case "error":
      return (
        <svg className="w-5 h-5 flex-shrink-0 text-error dark:text-error-dark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
        </svg>
      );
    case "info":
    default:
      return (
        <svg className="w-5 h-5 flex-shrink-0 text-info dark:text-info-dark" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
      );
  }
}

// ── Variant styles ────────────────────────────────────────────────────────
const variantStyles: Record<AlertVariant, string> = {
  info:    "bg-info-bg dark:bg-info-bg-dark border-info/20 dark:border-info-dark/20",
  success: "bg-success-bg dark:bg-success-bg-dark border-success/20 dark:border-success-dark/20",
  warning: "bg-warning-bg dark:bg-warning-bg-dark border-warning/20 dark:border-warning-dark/20",
  error:   "bg-error-bg dark:bg-error-bg-dark border-error/20 dark:border-error-dark/20",
};

const headingStyles: Record<AlertVariant, string> = {
  info:    "text-info dark:text-info-dark",
  success: "text-success dark:text-success-dark",
  warning: "text-warning dark:text-warning-dark",
  error:   "text-error dark:text-error-dark",
};

// ── Props ─────────────────────────────────────────────────────────────────
interface AlertProps {
  variant?: AlertVariant;
  /** Bold heading line */
  title?: string;
  /** Supporting body text */
  description?: ReactNode;
  /** Allow user to dismiss */
  dismissible?: boolean;
  /** Callback triggered when alert is dismissed */
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────
export function Alert({
  variant = "info",
  title,
  description,
  dismissible = false,
  onClose,
  className,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        variantStyles[variant],
        className
      )}
    >
      <AlertIcon variant={variant} />

      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("text-sm font-semibold", headingStyles[variant])}>
            {title}
          </p>
        )}
        {description && (
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            {description}
          </p>
        )}
        {children && (
          <div className="text-sm text-[var(--text-secondary)] mt-0.5">
            {children}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className={cn(
            "flex-shrink-0 rounded p-0.5 -mr-1 -mt-0.5",
            "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
            "transition-colors duration-fast",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          )}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
          </svg>
        </button>
      )}
    </div>
  );
}
