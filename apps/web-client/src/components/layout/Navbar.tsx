"use client";

/**
 * AutoVerse AI — Navbar Component (Rebranded to Capo Cars)
 *
 * Primary top navigation bar.
 * - Transparent over hero → solid/glass on scroll
 * - Logo left, nav links center, auth buttons right
 * - Dark mode toggle
 * - Mobile: hamburger → full-screen slide-over drawer
 * - Skip-to-content for keyboard users
 *
 * Per docs/UI_UX_Guidelines.md §10 (Navigation) and §16 (Accessibility).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useThemeContext } from "@/components/providers/ThemeProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

// ── Nav Items ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Buy", href: ROUTES.SEARCH },
  { label: "Rent", href: ROUTES.RENTALS },
  { label: "Compare", href: ROUTES.COMPARE },
  { label: "AI Picks", href: "#ai-recommendation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Logo SVG ─────────────────────────────────────────────────────────────
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="4" fill="var(--accent)" />
      <path
        d="M22 10 L18 10 C14 10 10 13.5 10 16 C10 18.5 14 22 18 22 L22 22 L22 19 L18 19 C15.5 19 13.5 17.5 13.5 16 C13.5 14.5 15.5 13 18 13 L22 13 Z"
        fill="var(--gold)"
      />
    </svg>
  );
}

// ── Dark Mode Toggle ──────────────────────────────────────────────────────
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
        <svg className="w-4.5 h-4.5" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm8-5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zm9.657-5.657a.75.75 0 010 1.06l-1.061 1.061a.75.75 0 11-1.06-1.06l1.06-1.061a.75.75 0 011.061 0zM7.464 13.596a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 01-1.06-1.06l1.06-1.061a.75.75 0 011.06 0zM14.657 14.657a.75.75 0 01-1.06 0l-1.061-1.06a.75.75 0 111.06-1.06l1.061 1.06a.75.75 0 010 1.06zM6.404 6.404a.75.75 0 01-1.06 0L4.282 5.343a.75.75 0 011.06-1.06L6.404 5.34a.75.75 0 010 1.061zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        </svg>
      ) : (
        <svg className="w-4.5 h-4.5" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Transparent → solid on scroll
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isMobileMenuOpen]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const isHero = pathname === "/";

  return (
    <>
      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300",
          isScrolled || isMobileMenuOpen
            ? "bg-[var(--bg-elevated)]/95 backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm"
            : isHero
            ? "bg-transparent"
            : "bg-[var(--bg-elevated)]/95 backdrop-blur-xl border-b border-[var(--border-color)]"
        )}
      >
        <div className="av-container h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md"
            aria-label={`${APP_NAME} home`}
          >
            <LogoMark className="w-8 h-8 flex-shrink-0" />
            <span
              className={cn(
                "font-bold text-[15px] tracking-tight hidden sm:block transition-colors duration-200 uppercase tracking-widest",
                !isScrolled && isHero
                  ? "text-white"
                  : "text-[var(--text-primary)]"
              )}
            >
              Capo <span className="text-[var(--gold)]">Cars</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isActive(item.href)
                    ? "text-[var(--accent)] bg-[var(--bg-secondary)]"
                    : !isScrolled && isHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <DarkModeToggle />

            {isAuthenticated && user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href={
                    user.role === "admin"
                      ? ROUTES.ADMIN_DASHBOARD
                      : user.role === "dealer"
                      ? ROUTES.DEALER_DASHBOARD
                      : ROUTES.DASHBOARD
                  }
                  className={cn(
                    "text-sm font-semibold transition-colors duration-fast focus-visible:outline-none",
                    !isScrolled && isHero
                      ? "text-white/90 hover:text-white"
                      : "text-[var(--text-primary)] hover:text-[var(--accent)]"
                  )}
                >
                  {user.full_name}
                </Link>
                <button
                  onClick={logout}
                  className={cn(
                    "h-9 px-4 rounded-md text-sm font-semibold",
                    "border transition-all duration-fast",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    !isScrolled && isHero
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  )}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href={ROUTES.LOGIN}
                  className={cn(
                    "h-9 px-4 rounded-md text-sm font-semibold transition-all duration-fast",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    !isScrolled && isHero
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  )}
                >
                  Log In
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  className={cn(
                    "h-9 px-4 rounded-md text-sm font-semibold transition-all duration-fast",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                    "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                  )}
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Hamburger — mobile */}
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              className={cn(
                "lg:hidden w-9 h-9 rounded-lg flex items-center justify-center",
                "transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                !isScrolled && isHero
                  ? "text-white hover:bg-white/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
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
          className="fixed inset-0 z-30 pt-16 lg:hidden bg-[var(--bg-elevated)] animate-fade-in"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
        >
          <nav
            aria-label="Mobile navigation"
            className="av-container py-6 flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center px-4 py-3.5 rounded-xl text-base font-medium",
                  "transition-colors duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                  isActive(item.href)
                    ? "text-[var(--accent)] bg-[var(--bg-secondary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-3 border-t border-[var(--border-color)]" />

            {isAuthenticated && user ? (
              <div className="flex flex-col gap-2">
                <div className="px-4 py-2 flex flex-col">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {user.full_name}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] capitalize mt-0.5">
                    {user.role}
                  </span>
                </div>
                <Link
                  href={
                    user.role === "admin"
                      ? ROUTES.ADMIN_DASHBOARD
                      : user.role === "dealer"
                      ? ROUTES.DEALER_DASHBOARD
                      : ROUTES.DASHBOARD
                  }
                  className="flex items-center justify-center px-4 py-3.5 rounded-xl text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)] transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center px-4 py-3.5 rounded-xl text-base font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href={ROUTES.REGISTER}
                  className="flex items-center justify-center px-4 py-3.5 rounded-xl text-base font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Get Started — Free
                </Link>
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center justify-center px-4 py-3.5 rounded-xl text-base font-medium text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Log In
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
