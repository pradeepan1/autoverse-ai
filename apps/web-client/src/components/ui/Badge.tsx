"use client";

/**
 * AutoVerse AI — Badge Component
 *
 * Compact label for status indicators, categories, and counts.
 *
 * Variants: default | success | warning | error | info
 * Sizes:    sm | md
 *
 * Per docs/UI_UX_Guidelines.md §5 (Colors — status usage rules).
 * Status colors used consistently, never repurposed for branding.
 */

import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { BadgeVariant, ComponentSize } from "@/types";

// ── Props ─────────────────────────────────────────────────────────────────
interface BadgeProps {
  variant?: BadgeVariant;
  size?: Extract<ComponentSize, "sm" | "md">;
  /** Optional dot indicator before the label */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

// ── Variant styles ────────────────────────────────────────────────────────
const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]",
  success: "bg-success-bg dark:bg-success-bg-dark text-success dark:text-success-dark border border-success/20 dark:border-success-dark/20",
  warning: "bg-warning-bg dark:bg-warning-bg-dark text-warning dark:text-warning-dark border border-warning/20 dark:border-warning-dark/20",
  error:   "bg-error-bg dark:bg-error-bg-dark text-error dark:text-error-dark border border-error/20 dark:border-error-dark/20",
  info:    "bg-info-bg dark:bg-info-bg-dark text-info dark:text-info-dark border border-info/20 dark:border-info-dark/20",
};

const dotVariantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--text-muted)]",
  success: "bg-success dark:bg-success-dark",
  warning: "bg-warning dark:bg-warning-dark",
  error:   "bg-error dark:bg-error-dark",
  info:    "bg-info dark:bg-info-dark",
};

const sizeStyles: Record<"sm" | "md", string> = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
};

// ── Component ─────────────────────────────────────────────────────────────
export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium leading-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotVariantStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
