"use client";

/**
 * AutoVerse AI — ThemeProvider
 *
 * Context-based theme provider that:
 * - Manages `.dark` class on `<html>` element
 * - Persists theme preference to localStorage
 * - Respects OS-level `prefers-color-scheme` for "system" mode
 * - Prevents flash of unstyled content (FOUC) with an inline script
 *
 * Usage: Wrap the root layout. Consume via `useThemeContext()`.
 * Per docs/UI_UX_Guidelines.md §14–15 (Dark/Light Mode).
 */

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useTheme } from "@/lib/hooks/useTheme";
import type { ThemeMode } from "@/types";

// ── Context ───────────────────────────────────────────────────────────────
interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Wraps the application with theme management context.
 * Must be placed inside the root layout, before any theme-consuming components.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeValues = useTheme();

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
/**
 * Access the theme context.
 * Must be used within a `ThemeProvider` subtree.
 *
 * @throws If called outside a ThemeProvider
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
