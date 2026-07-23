"use client";

/**
 * AutoVerse AI — useLocalStorage Hook
 *
 * Generic, typed localStorage hook with SSR safety.
 * Returns a stateful value backed by localStorage, and a setter
 * that updates both the state and localStorage simultaneously.
 *
 * SSR-safe: defaults to initialValue when window is unavailable.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage<string>("av_theme", "system");
 */

import { useCallback, useEffect, useState } from "react";

/**
 * @param key          - localStorage key
 * @param initialValue - Default value when no stored value exists
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (_value: T | ((_prev: T) => T)) => void, () => void] {
  // Initialise from localStorage; fall back to initialValue for SSR
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync state when key changes (e.g. user switches accounts)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item !== null ? (JSON.parse(item) as T) : initialValue);
    } catch {
      setStoredValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (value: T | ((_prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          } catch {
            // Storage quota exceeded or private mode — silently ignore
          }
        }
        return nextValue;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, removeValue];
}
