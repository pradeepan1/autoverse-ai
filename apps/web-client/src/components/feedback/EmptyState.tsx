"use client";

/**
 * AutoVerse AI — EmptyState Component
 *
 * Displays a contextual empty state when content is unavailable:
 * zero search results, empty wishlist, no notifications, etc.
 *
 * Structure: Icon → Heading → Body text → Optional CTA
 *
 * Per docs/UI_UX_Guidelines.md §1 (Design Philosophy — content-first hierarchy).
 * Per docs/PROJECT_RULES.md Rule 21 (no placeholder code — this IS the state).
 */

import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

// ── Default Icon ──────────────────────────────────────────────────────────
function DefaultEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 32h16M32 24v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────
interface EmptyStateProps {
  /** Custom icon element (defaults to a generic circle+plus icon) */
  icon?: ReactNode;
  /** Main heading */
  title: string;
  /** Supporting body text */
  description?: string;
  /** Optional CTA (usually a Button component) */
  action?: ReactNode;
  /** Compact size for inline usage (no full-page centering) */
  compact?: boolean;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        compact ? "py-8 gap-3" : "py-16 gap-4",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "text-[var(--text-muted)]",
          compact ? "w-10 h-10" : "w-16 h-16"
        )}
      >
        {icon ?? <DefaultEmptyIcon className="w-full h-full" />}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3
          className={cn(
            "font-semibold text-[var(--text-primary)]",
            compact ? "text-base" : "text-h4"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Action */}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
