"use client";

/**
 * AutoVerse AI — useTheme Hook
 *
 * Manages application theme (light / dark / system).
 * - Reads/writes theme preference from localStorage
 * - Respects OS-level `prefers-color-scheme` for 'system' mode
 * - Applies/removes `.dark` class on `<html>` element
 *
 * Consumed by ThemeProvider and available to any component needing
 * theme-aware logic without the full provider context.
 *
 * Per docs/UI_UX_Guidelines.md §14–15 (Dark/Light Mode) and §16 (Accessibility).
 */

import { useCallback, useEffect } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import type { ThemeMode } from "@/types";

import { useLocalStorage } from "./useLocalStorage";

/**
 * Returns the resolved effective theme ("light" or "dark") based on
 * the stored preference and the OS colour-scheme preference.
 */
function resolveTheme(mode: ThemeMode): "light" | "dark" {
  if (mode === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return mode;
}

interface UseThemeReturn {
  /** Stored theme preference ("light" | "dark" | "system") */
  theme: ThemeMode;
  /** Resolved effective theme ("light" | "dark") */
  resolvedTheme: "light" | "dark";
  /** Set theme to a specific mode */
  setTheme: (_mode: ThemeMode) => void;
  /** Toggle between light and dark (ignores system setting) */
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeStorage] = useLocalStorage<ThemeMode>(
    STORAGE_KEYS.THEME,
    "system"
  );

  const applyTheme = useCallback((mode: ThemeMode) => {
    const resolved = resolveTheme(mode);
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // Apply theme on mount and whenever stored preference changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for OS-level preference changes when in "system" mode
  useEffect(() => {
    if (typeof window === "undefined" || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeStorage(mode);
    },
    [setThemeStorage]
  );

  const toggleTheme = useCallback(() => {
    const resolved = resolveTheme(theme);
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return {
    theme,
    resolvedTheme: resolveTheme(theme),
    setTheme,
    toggleTheme,
  };
}
