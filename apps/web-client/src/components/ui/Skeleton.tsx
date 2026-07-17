"use client";

/**
 * AutoVerse AI — Skeleton Component
 *
 * Placeholder loading UI components for content-heavy surfaces.
 * Preferred over spinners for listing grids and dashboards to
 * reduce perceived latency.
 *
 * Components:
 * - `SkeletonBox`  — generic rectangular placeholder
 * - `SkeletonText` — text line placeholder (configurable width)
 * - `SkeletonCard` — full listing card skeleton
 *
 * Respects `prefers-reduced-motion`: shimmer animation disabled,
 * replaced with static muted background.
 *
 * Per docs/UI_UX_Guidelines.md §12 (Animations — skeleton preference).
 */

import { cn } from "@/lib/utils/cn";

// ── SkeletonBox ───────────────────────────────────────────────────────────
interface SkeletonBoxProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

export function SkeletonBox({ className, rounded = "md" }: SkeletonBoxProps) {
  const radiusMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "shimmer bg-[var(--bg-secondary)]",
        radiusMap[rounded],
        className
      )}
    />
  );
}

// ── SkeletonText ──────────────────────────────────────────────────────────
interface SkeletonTextProps {
  /** Width as a Tailwind class or percentage string */
  width?: "full" | "3/4" | "1/2" | "1/3" | "1/4";
  className?: string;
}

const widthMap: Record<NonNullable<SkeletonTextProps["width"]>, string> = {
  full: "w-full",
  "3/4": "w-3/4",
  "1/2": "w-1/2",
  "1/3": "w-1/3",
  "1/4": "w-1/4",
};

export function SkeletonText({ width = "full", className }: SkeletonTextProps) {
  return (
    <SkeletonBox
      className={cn("h-4", widthMap[width], className)}
      rounded="sm"
    />
  );
}

// ── SkeletonCard ──────────────────────────────────────────────────────────
interface SkeletonCardProps {
  className?: string;
}

/**
 * Full listing card skeleton matching the structure of the real listing card:
 * image (16:9) → title → metadata lines → price → actions
 */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      aria-label="Loading…"
      className={cn(
        "rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] overflow-hidden",
        className
      )}
    >
      {/* Image placeholder — 16:9 */}
      <div className="aspect-video w-full shimmer bg-[var(--bg-secondary)]" />

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title */}
        <SkeletonText width="3/4" className="h-5" />

        {/* Metadata row */}
        <div className="flex gap-3">
          <SkeletonText width="1/4" className="h-3.5" />
          <SkeletonText width="1/4" className="h-3.5" />
          <SkeletonText width="1/3" className="h-3.5" />
        </div>

        {/* Price */}
        <SkeletonText width="1/2" className="h-7" />

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <SkeletonBox className="h-9 flex-1" rounded="md" />
          <SkeletonBox className="h-9 w-9" rounded="md" />
        </div>
      </div>
    </div>
  );
}
