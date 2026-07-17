"use client";

/**
 * AutoVerse AI — LoadingGrid Component
 *
 * Grid of SkeletonCard components for listing/inventory loading states.
 * Preferred over spinners for content-heavy grids (per UI_UX_Guidelines §12).
 *
 * @example
 * <LoadingGrid count={6} columns={3} />
 */

import { SkeletonCard } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

// ── Props ─────────────────────────────────────────────────────────────────
interface LoadingGridProps {
  /** Number of skeleton cards to render */
  count?: number;
  /** Number of columns on desktop (uses auto-fill below) */
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnMap: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

// ── Component ─────────────────────────────────────────────────────────────
export function LoadingGrid({
  count = 6,
  columns = 3,
  className,
}: LoadingGridProps) {
  return (
    <div
      aria-label="Loading content…"
      aria-busy="true"
      className={cn(
        "grid grid-cols-1 gap-6",
        columnMap[columns],
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
