"use client";

/**
 * AutoVerse AI — Input Component
 *
 * Text input field following the design system form specification.
 *
 * Rules enforced (from docs/UI_UX_Guidelines.md §9 — Forms):
 * - Label always visible ABOVE the field — never placeholder-only
 * - Error message appears directly below the field in error color
 * - Accent-colored 2px focus ring (never removed)
 * - Required fields marked with asterisk
 * - Forwards ref for React Hook Form / external control
 *
 * Per docs/PROJECT_RULES.md Rule 27 (client + server validation).
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

// ── Props ─────────────────────────────────────────────────────────────────
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input (shown when no error) */
  helpText?: string;
  /** Icon displayed inside the input on the left */
  leftIcon?: ReactNode;
  /** Icon displayed inside the input on the right */
  rightIcon?: ReactNode;
  /** Wrapper className */
  wrapperClassName?: string;
}

// ── Component ─────────────────────────────────────────────────────────────
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helpText,
      leftIcon,
      rightIcon,
      required,
      id,
      className,
      wrapperClassName,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Ensure label+input association via id
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = helpText && !error ? `${inputId}-help` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {label}
            {required && (
              <span className="text-[var(--error)] ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left icon */}
          {leftIcon && (
            <span
              className="absolute left-3 text-[var(--text-muted)] pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={errorId ?? helpId}
            className={cn(
              // Base
              "w-full rounded-md border bg-[var(--bg-elevated)] text-[var(--text-primary)]",
              "text-sm transition-all duration-fast ease-standard",
              "placeholder:text-[var(--text-muted)]",
              // Padding — adjust for icons
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              "py-2.5",
              // Default border
              "border-[var(--border-color)]",
              // Focus
              "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
              // Error state
              error && "border-[var(--error)] focus:ring-[var(--error)] focus:border-[var(--error)]",
              // Disabled
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-secondary)]",
              className
            )}
            {...rest}
          />

          {/* Right icon */}
          {rightIcon && (
            <span
              className="absolute right-3 text-[var(--text-muted)] pointer-events-none"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-[var(--error)] flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-9.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5.5zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {/* Help text */}
        {helpText && !error && (
          <p id={helpId} className="text-xs text-[var(--text-muted)]">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
