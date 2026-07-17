"use client";

/**
 * AutoVerse AI — useDebounce Hook
 *
 * Delays updating a value until after `delay` milliseconds have elapsed
 * since the last change. Used for search inputs and filter controls to
 * prevent excessive API calls on every keystroke.
 *
 * @example
 * const [query, setQuery] = useState("");
 * const debouncedQuery = useDebounce(query, 350);
 *
 * // API call only fires 350ms after the user stops typing
 * useEffect(() => {
 *   if (debouncedQuery) fetchResults(debouncedQuery);
 * }, [debouncedQuery]);
 */

import { useEffect, useState } from "react";

/**
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds (default: 350ms)
 * @returns Debounced value — updates only after `delay` ms of no changes
 */
export function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
