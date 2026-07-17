/**
 * AutoVerse AI — `cn()` Class Name Utility
 *
 * Combines `clsx` (conditional class construction) with `tailwind-merge`
 * (conflict resolution for Tailwind utility classes) to produce a single,
 * clean class string.
 *
 * Use this everywhere Tailwind classes are merged conditionally.
 * Per docs/PROJECT_RULES.md Rule 12 (Tailwind CSS) and Rule 11 (TypeScript).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-accent", className)
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind conflict resolution.
 *
 * @param inputs - Any number of class values (strings, arrays, objects)
 * @returns A single, merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
