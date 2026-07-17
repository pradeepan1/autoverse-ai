"use client";

/**
 * AutoVerse AI — Navbar Component
 *
 * Primary top navigation bar for buyer-facing views.
 *
 * Behaviour:
 * - Transparent over hero → solid on scroll (Apple/Tesla pattern)
 * - Logo left, nav links center/right, utility icons right
 * - Dark mode toggle
 * - Mobile: hamburger → full-screen slide-over drawer
 * - Skip-to-content link for keyboard users
 *
 * Per docs/UI_UX_Guidelines.md §10 (Navigation) and §16 (Accessibility).
 * Per docs/UI_UX_Guidelines.md §13 (Glassmorphism — nav over hero images).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useThemeContext } from "@/components/providers/ThemeProvider";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

// ── Nav Items ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Search", href: ROUTES.SEARCH },
  { label: "Compare", href: ROUTES.COMPARE },
  { label: "Rentals", href: ROUTES.RENTALS },
  { label: "Wishlist", href: ROUTES.WISHLIST },
];

// ── Dark Mode Toggle Icon ─────────────────────────────────────────────────
function DarkModeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeContext();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center",
        "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        "hover:bg-[var(--bg-secondary)]",
        "transition-all duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      )}
    >
      {isDark ? (
        // Sun icon
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm8-5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zm9.657-5.657a.75.75 0 010 1.06l-1.061 1.061a.75.75 0 11-1.06-1.06l1.06-1.061a.75.75 0 011.061 0zM7.464 13.596a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.06-1.06l1.06-1.061a.75.75 0 011.06 0zM14.657 14.657a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 111.06-1.06l1.061 1.06a.75.75 0 010 1.06zM6.404 6.404a.75.75 0 01-1.06 0L4.282 5.343a.75.75 0 011.06-1.06L6.404 5.34a.75.75 0 010 1.061zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        </svg>
      ) : (
        // Moon icon
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection — switch from transparent to solid
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isMobileMenuOpen]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-16",
          "transition-all duration-base ease-standard",
          isScrolled || isMobileMenuOpen
            ? "bg-[var(--bg-elevated)] border-b border-[var(--border-color)] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="av-container h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md"
            aria-label={`${APP_NAME} home`}
          >
            <span className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm" aria-hidden="true">AV</span>
            </span>
            <span className="font-bold text-base text-[var(--text-primary)] hidden sm:block">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  "transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isActive(item.href)
                    ? "text-[var(--text-primary)] bg-[var(--bg-secondary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right utility area */}
          <div className="flex items-center gap-2">
            <DarkModeToggle />

            {/* Sign In — desktop */}
            <Link
              href={ROUTES.LOGIN}
              className={cn(
                "hidden md:inline-flex items-center justify-center",
                "h-9 px-4 rounded-md text-sm font-semibold",
                "bg-[var(--accent)] text-white",
                "hover:bg-[var(--accent-hover)]",
                "transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              )}
            >
              Sign In
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              className={cn(
                "md:hidden w-9 h-9 rounded-lg flex items-center justify-center",
                "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                "hover:bg-[var(--bg-secondary)] transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              )}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          ref={mobileMenuRef}
          className={cn(
            "fixed inset-0 z-30 pt-16 md:hidden",
            "bg-[var(--bg-elevated)] animate-fade-in"
          )}
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
        >
          <nav
            aria-label="Mobile navigation"
            className="av-container py-4 flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-base font-medium",
                  "transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isActive(item.href)
                    ? "text-[var(--text-primary)] bg-[var(--bg-secondary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-2 border-t border-[var(--border-color)]" />

            {/* Auth */}
            <Link
              href={ROUTES.LOGIN}
              className={cn(
                "flex items-center justify-center px-4 py-3 rounded-lg",
                "text-base font-semibold text-white bg-[var(--accent)]",
                "hover:bg-[var(--accent-hover)] transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              )}
            >
              Sign In
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className={cn(
                "flex items-center justify-center px-4 py-3 rounded-lg",
                "text-base font-medium text-[var(--text-primary)]",
                "border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]",
                "transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              )}
            >
              Create Account
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
