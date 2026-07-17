"use client";

/**
 * AutoVerse AI — Breadcrumbs Component
 *
 * Navigation breadcrumb trail for deep detail pages.
 * (Brand → Model → Variant → Listing)
 *
 * Features:
 * - Semantic `<nav aria-label="Breadcrumb">` + `<ol>`
 * - BreadcrumbList JSON-LD structured data for SEO
 * - Current page is non-linked and has `aria-current="page"`
 * - Chevron separator (not decorative, hidden from screen readers)
 *
 * Per docs/UI_UX_Guidelines.md §10 (Navigation — Breadcrumbs).
 * Per docs/Architecture.md (SEO — structured data).
 */

import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { BreadcrumbItem } from "@/types";

// ── Props ─────────────────────────────────────────────────────────────────
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-body-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label + index} className="flex items-center gap-1">
                {/* Separator */}
                {index > 0 && (
                  <svg
                    className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06L7.28 11.78a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                {/* Current page — non-linked */}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      isLast
                        ? "text-[var(--text-primary)] font-medium"
                        : "text-[var(--text-secondary)]"
                    )}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[var(--text-secondary)]",
                      "hover:text-[var(--text-primary)]",
                      "transition-colors duration-fast",
                      "focus-visible:outline-none focus-visible:underline"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
