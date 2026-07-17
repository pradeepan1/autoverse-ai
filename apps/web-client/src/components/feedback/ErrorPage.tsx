"use client";

/**
 * AutoVerse AI — ErrorPage Component
 *
 * Reusable error display for API errors, 404s, and server errors.
 * Used by Next.js error.tsx, not-found.tsx, and inline API error states.
 *
 * Per docs/UI_UX_Guidelines.md §1 (content-first, Apple restraint).
 */

import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

// ── Props ─────────────────────────────────────────────────────────────────
interface ErrorPageProps {
  /** Error headline (e.g. "Page Not Found", "Something went wrong") */
  title?: string;
  /** Descriptive message */
  message?: string;
  /** Optional status code display */
  statusCode?: number;
  /** CTA action (usually a Button or Link) */
  action?: ReactNode;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────
export function ErrorPage({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again or return home.",
  statusCode,
  action,
  className,
}: ErrorPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "min-h-[60vh] py-16 px-4 gap-6",
        className
      )}
    >
      {/* Status code — large decorative number */}
      {statusCode && (
        <span
          className="text-[96px] font-bold leading-none tabular-nums"
          style={{ color: "var(--accent)", opacity: 0.15 }}
          aria-hidden="true"
        >
          {statusCode}
        </span>
      )}

      {/* Icon */}
      <div className="w-16 h-16 text-[var(--text-muted)]" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" />
          <path d="M32 20v16M32 40v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="text-h2 font-bold text-[var(--text-primary)]">{title}</h1>
        <p className="text-body text-[var(--text-secondary)] leading-relaxed">
          {message}
        </p>
      </div>

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  );
}
