"use client";

/**
 * AutoVerse AI — Footer Component
 *
 * Site-wide footer with logo, navigation links, social icons, and copyright.
 *
 * Layout:
 * - Desktop: Logo + 3-4 link columns + social icons (multi-column grid)
 * - Mobile: Stacked (logo → columns stacked → social → copyright)
 *
 * Per docs/UI_UX_Guidelines.md §10 (Navigation) and §17 (Responsive Rules).
 */

import Link from "next/link";

import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

// ── Link Group ────────────────────────────────────────────────────────────
interface FooterLinkGroup {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

const linkGroups: FooterLinkGroup[] = [
  {
    heading: "Marketplace",
    links: [
      { label: "Browse Cars", href: ROUTES.SEARCH },
      { label: "Compare Cars", href: ROUTES.COMPARE },
      { label: "Car Rentals", href: ROUTES.RENTALS },
      { label: "Price Prediction", href: `${ROUTES.SEARCH}?tab=predict` },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign Up", href: ROUTES.REGISTER },
      { label: "Sign In", href: ROUTES.LOGIN },
      { label: "Wishlist", href: ROUTES.WISHLIST },
      { label: "Dashboard", href: ROUTES.DASHBOARD },
    ],
  },
  {
    heading: "Dealers",
    links: [
      { label: "Dealer Portal", href: ROUTES.DEALER_DASHBOARD },
      { label: "List Your Cars", href: ROUTES.DEALER_LISTINGS },
      { label: "Manage Leads", href: ROUTES.DEALER_LEADS },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// ── Social Icons ──────────────────────────────────────────────────────────
const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

// ── Component ─────────────────────────────────────────────────────────────
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-auto"
      aria-label="Site footer"
    >
      <div className="av-container py-12 md:py-16">
        {/* Top section — logo + link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md"
              aria-label={`${APP_NAME} home`}
            >
              {/* Logo mark */}
              <span className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">AV</span>
              </span>
              <span className="font-bold text-base text-[var(--text-primary)]">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed max-w-[200px]">
              AI-powered automotive intelligence for smarter car decisions.
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                {group.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "text-sm text-[var(--text-secondary)]",
                        "hover:text-[var(--text-primary)]",
                        "transition-colors duration-fast",
                        "focus-visible:outline-none focus-visible:underline"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section — copyright + social */}
        <div className="mt-10 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={cn(
                  "p-2 rounded-lg text-[var(--text-muted)]",
                  "hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
                  "transition-all duration-fast",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                )}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
