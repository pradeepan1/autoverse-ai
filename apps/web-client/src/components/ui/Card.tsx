"use client";

/**
 * AutoVerse AI — Card Component
 *
 * Composable card primitive for listings, dealer summaries, dashboard
 * widgets, and comparison rows.
 *
 * Sub-components: Card, CardHeader, CardBody, CardFooter
 *
 * `elevated` prop:
 * - Adds shadow-sm at rest → shadow-md on hover
 * - Applies subtle 4px upward translate on hover (Tesla-style responsiveness)
 *
 * Per docs/UI_UX_Guidelines.md §8 (Cards).
 * Per docs/PROJECT_RULES.md Rule 17 (reusable, composable).
 */

import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

// ── Card Root ─────────────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables hover elevation: shadow + subtle upward translate */
  elevated?: boolean;
  /** Remove default padding (for media-first cards) */
  noPadding?: boolean;
  children: ReactNode;
}

export function Card({
  elevated = false,
  noPadding = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-[var(--glass-border)] glass",
        "transition-all duration-base ease-standard",
        elevated && [
          "shadow-[0_15px_45px_rgba(0,0,0,0.45),0_0_20px_rgba(212,175,55,0.12)] cursor-pointer",
          "hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.25)]",
        ],
        !noPadding && "p-6",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ── Card Header ───────────────────────────────────────────────────────────
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className, children, ...rest }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4",
        "pb-4 border-b border-[var(--border-color)] mb-4",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ── Card Body ─────────────────────────────────────────────────────────────
interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardBody({ className, children, ...rest }: CardBodyProps) {
  return (
    <div className={cn("flex-1", className)} {...rest}>
      {children}
    </div>
  );
}

// ── Card Footer ───────────────────────────────────────────────────────────
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({
  className,
  children,
  ...rest
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "pt-4 border-t border-[var(--border-color)] mt-4",
        "flex items-center gap-3",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
