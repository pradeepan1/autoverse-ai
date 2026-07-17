"use client";

/**
 * AutoVerse AI — Spinner Component
 *
 * SVG-based loading spinner with accessible ARIA label.
 * Respects `prefers-reduced-motion` (opacity pulse instead of rotation).
 *
 * Per docs/UI_UX_Guidelines.md §12 (Animations) and §16 (Accessibility).
 *
 * @example
 * <Spinner size="md" aria-label="Loading cars..." />
 */

import { cn } from "@/lib/utils/cn";
import type { ComponentSize } from "@/types";

interface SpinnerProps {
  /** Visual size of the spinner */
  size?: ComponentSize;
  /** Accessible label for screen readers */
  "aria-label"?: string;
  className?: string;
}

const sizeMap: Record<ComponentSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const strokeWidthMap: Record<ComponentSize, number> = {
  sm: 2.5,
  md: 2,
  lg: 1.75,
};

export function Spinner({
  size = "md",
  "aria-label": ariaLabel = "Loading…",
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <svg
        className={cn(
          sizeMap[size],
          "animate-spin motion-reduce:animate-none motion-reduce:opacity-50"
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidthMap[size]}
          className="opacity-25"
        />
        {/* Spinning arc */}
        <path
          fill="currentColor"
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  );
}
