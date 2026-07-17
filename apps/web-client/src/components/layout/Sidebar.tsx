"use client";

/**
 * AutoVerse AI — Sidebar Component
 *
 * Left sidebar navigation for Dealer and Admin views.
 *
 * Layout:
 * - Desktop (≥lg): Fixed 240px width, collapsible to 64px icon-only mode
 * - Below lg: Off-canvas drawer, slide in from left
 *
 * Active state: Accent-colored left border + background tint (not fill-alone)
 * Per docs/UI_UX_Guidelines.md §10 (Navigation — Dealer/Admin sidebar).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

// ── Types ─────────────────────────────────────────────────────────────────
export interface SidebarItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string | number;
}

export interface SidebarGroup {
  label?: string;
  items: SidebarItem[];
}

// ── Props ─────────────────────────────────────────────────────────────────
interface SidebarProps {
  /** Navigation groups with optional section labels */
  groups: SidebarGroup[];
  /** Collapsed: icon-only mode (desktop) */
  collapsed?: boolean;
  /** Mobile drawer mode */
  isDrawerOpen?: boolean;
  /** Called when backdrop/close button clicked (mobile) */
  onDrawerClose?: () => void;
  /** Bottom slot (e.g. user profile row) */
  footer?: ReactNode;
  className?: string;
}

// ── Nav Item ──────────────────────────────────────────────────────────────
interface SidebarNavItemProps {
  item: SidebarItem;
  collapsed: boolean;
}

function SidebarNavItem({ item, collapsed }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-lg",
        "text-sm font-medium transition-all duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        // Active state — border + tint (never fill alone)
        isActive
          ? [
              "text-[var(--accent)] bg-accent/5 dark:bg-accent-dark/10",
              "before:absolute before:left-0 before:top-2 before:bottom-2",
              "before:w-0.5 before:rounded-full before:bg-[var(--accent)]",
            ]
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
        collapsed && "justify-center px-2"
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          "flex-shrink-0 w-5 h-5",
          isActive ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
        )}
        aria-hidden="true"
      >
        {item.icon}
      </span>

      {/* Label + badge */}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className={cn(
                "ml-auto flex-shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded-full",
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
              )}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

// ── Sidebar Panel ─────────────────────────────────────────────────────────
function SidebarPanel({
  groups,
  collapsed = false,
  footer,
  className,
}: {
  groups: SidebarGroup[];
  collapsed?: boolean;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[var(--bg-secondary)] border-r border-[var(--border-color)]",
        "transition-all duration-base ease-standard",
        collapsed ? "w-16" : "w-60",
        className
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className={cn("h-16 flex items-center border-b border-[var(--border-color)] flex-shrink-0", collapsed ? "justify-center px-2" : "px-4 gap-2")}>
        <span className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm" aria-hidden="true">AV</span>
        </span>
        {!collapsed && (
          <span className="font-bold text-sm text-[var(--text-primary)] truncate">
            {APP_NAME}
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav aria-label="Sidebar navigation" className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className={gIdx > 0 ? "mt-4" : undefined}>
            {/* Section label */}
            {group.label && !collapsed && (
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem item={item} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      {footer && (
        <div className="border-t border-[var(--border-color)] p-2 flex-shrink-0">
          {footer}
        </div>
      )}
    </aside>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export function Sidebar({
  groups,
  collapsed = false,
  isDrawerOpen = false,
  onDrawerClose,
  footer,
  className,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar — fixed, always visible */}
      <div className="hidden lg:flex h-full">
        <SidebarPanel
          groups={groups}
          collapsed={collapsed}
          footer={footer}
          className={className}
        />
      </div>

      {/* Mobile drawer — off-canvas */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 animate-fade-in"
            onClick={onDrawerClose}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="relative z-10 animate-slide-in-left">
            <SidebarPanel groups={groups} footer={footer} />
          </div>
        </div>
      )}
    </>
  );
}
