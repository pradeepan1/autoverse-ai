"use client";

/**
 * AutoVerse AI — Textarea Component
 *
 * Multi-line text input following the same design system specification
 * as Input — same label, error, helpText, required patterns.
 *
 * Additional features:
 * - `rows` prop for initial height
 * - Vertical resize only (horizontal resize disabled)
 * - Optional character count display
 *
 * Per docs/UI_UX_Guidelines.md §9 (Forms).
 */

import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

// ── Props ─────────────────────────────────────────────────────────────────
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label above the textarea */
  label?: string;
  /** Error message displayed below */
  error?: string;
  /** Helper text (shown when no error) */
  helpText?: string;
  /** Show character count "n / max" */
  showCharCount?: boolean;
  /** Wrapper className */
  wrapperClassName?: string;
}

// ── Component ─────────────────────────────────────────────────────────────
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helpText,
      showCharCount = false,
      required,
      id,
      rows = 4,
      maxLength,
      value,
      className,
      wrapperClassName,
      disabled,
      ...rest
    },
    ref
  ) => {
    const textareaId =
      id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    const errorId = error ? `${textareaId}-error` : undefined;
    const helpId = helpText && !error ? `${textareaId}-help` : undefined;

    const charCount =
      typeof value === "string" ? value.length : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {/* Label row */}
        <div className="flex items-baseline justify-between">
          {label && (
            <label
              htmlFor={textareaId}
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
          {/* Character count */}
          {showCharCount && maxLength !== undefined && (
            <span
              className={cn(
                "text-xs tabular-nums",
                charCount !== undefined && charCount > maxLength * 0.9
                  ? "text-[var(--warning)]"
                  : "text-[var(--text-muted)]"
              )}
              aria-live="polite"
            >
              {charCount ?? 0} / {maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={value}
          aria-invalid={!!error}
          aria-describedby={errorId ?? helpId}
          className={cn(
            "w-full rounded-md border bg-[var(--bg-elevated)] text-[var(--text-primary)]",
            "text-sm transition-all duration-fast ease-standard",
            "px-3 py-2.5",
            "placeholder:text-[var(--text-muted)]",
            "border-[var(--border-color)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]",
            // Vertical resize only
            "resize-y",
            error &&
              "border-[var(--error)] focus:ring-[var(--error)] focus:border-[var(--error)]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-secondary)]",
            className
          )}
          {...rest}
        />

        {/* Error */}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-[var(--error)] flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-9.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5.5zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {/* Help */}
        {helpText && !error && (
          <p id={helpId} className="text-xs text-[var(--text-muted)]">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
