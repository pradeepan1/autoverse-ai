"use client";

/**
 * AutoVerse AI — useMediaQuery Hook
 *
 * Returns a boolean indicating whether a CSS media query currently matches.
 * SSR-safe: defaults to `false` on the server.
 *
 * Use this for responsive conditional logic in components.
 * Pair with BREAKPOINTS constants rather than hardcoding values.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 767px)");
 * const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
 */

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // SSR-safe: return false during server-side rendering
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ── Convenience breakpoint hooks ──────────────────────────────────────────
/**
 * Returns true when viewport is at tablet width or wider (≥768px).
 */
export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px)");
}

/**
 * Returns true when viewport is at desktop width or wider (≥1024px).
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * Returns true when the user has requested reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
