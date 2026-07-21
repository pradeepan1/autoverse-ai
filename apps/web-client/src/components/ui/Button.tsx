"use client";

/**
 * AutoVerse AI — Button Component
 *
 * Primary interactive element for user actions.
 *
 * Variants: primary | secondary | ghost | destructive
 * Sizes:    sm | md | lg
 *
 * Features:
 * - `isLoading` state: shows Spinner, preserves button width (no layout shift)
 * - `leftIcon` / `rightIcon` support
 * - `disabled` state with correct ARIA
 * - Minimum 44×44px touch target (Apple HIG)
 * - Visible focus ring (accent-colored)
 * - Renders as `<button>` by default; pass `asChild` or wrap with Next.js `<Link>` as needed
 *
 * Per docs/UI_UX_Guidelines.md §7 (Buttons) and §16 (Accessibility).
 * Per docs/PROJECT_RULES.md Rule 17 (reusable, configurable component).
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { ButtonVariant, ComponentSize } from "@/types";

import { Spinner } from "./Spinner";

// ── Props ─────────────────────────────────────────────────────────────────
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size */
  size?: ComponentSize;
  /** Shows a loading spinner and disables interaction */
  isLoading?: boolean;
  /** Icon rendered before the label */
  leftIcon?: ReactNode;
  /** Icon rendered after the label */
  rightIcon?: ReactNode;
  /** Full-width button */
  fullWidth?: boolean;
  children: ReactNode;
}

// ── Variant styles ────────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-[var(--accent)] text-white dark:text-black",
    "hover:bg-[var(--accent-hover)]",
    "focus-visible:ring-[var(--accent)]",
    "shadow-sm hover:shadow-md",
    "active:scale-[0.98]"
  ),
  secondary: cn(
    "bg-[var(--bg-secondary)] text-[var(--text-primary)]",
    "border border-[var(--border-color)]",
    "hover:bg-[var(--bg-elevated)] hover:border-[var(--text-muted)]",
    "focus-visible:ring-[var(--accent)]",
    "active:scale-[0.98]"
  ),
  ghost: cn(
    "bg-transparent text-[var(--text-primary)]",
    "hover:bg-[var(--bg-secondary)]",
    "focus-visible:ring-[var(--accent)]",
    "active:scale-[0.98]"
  ),
  destructive: cn(
    "bg-[var(--error)] text-white",
    "hover:opacity-90",
    "focus-visible:ring-[var(--error)]",
    "shadow-sm hover:shadow-md",
    "active:scale-[0.98]"
  ),
};

// ── Size styles ───────────────────────────────────────────────────────────
const sizeStyles: Record<ComponentSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5 rounded-md",
  md: "h-11 px-5 text-sm gap-2 rounded-md",
  lg: "h-12 px-6 text-base gap-2 rounded-lg",
};

// ── Component ─────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-semibold",
          "transition-all duration-fast ease-standard",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "select-none whitespace-nowrap",
          // Min touch target — 44px (Apple HIG)
          "min-h-[44px]",
          // Disabled
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {/* Loading spinner overlaid — content becomes invisible but still reserves space */}
        {isLoading ? (
          <>
            <span className="invisible inline-flex items-center gap-2">
              {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </span>
            <span className="absolute">
              <Spinner
                size={size === "lg" ? "md" : "sm"}
                aria-label="Loading…"
              />
            </span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
