"use client";

/**
 * AutoVerse AI — App Shell
 *
 * Composes the global layout chrome (Navbar, optional Sidebar, Footer)
 * around page content, per docs/Architecture.md (Frontend Architecture).
 *
 * It accepts optional sidebar groups so that layouts with a sidebar
 * (e.g. Dealer or Admin dashboards) can reuse the same global layout
 * shell without duplication, complying with docs/PROJECT_RULES.md.
 */

import { type ReactNode, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar, type SidebarGroup } from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
  sidebarGroups?: SidebarGroup[];
  sidebarFooter?: ReactNode;
}

export function AppShell({
  children,
  sidebarGroups,
  sidebarFooter,
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hasSidebar = Boolean(sidebarGroups && sidebarGroups.length > 0);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Left Sidebar (Optional) */}
        {hasSidebar && (
          <Sidebar
            groups={sidebarGroups!}
            isDrawerOpen={isSidebarOpen}
            onDrawerClose={() => setIsSidebarOpen(false)}
            footer={sidebarFooter}
          />
        )}

        {/* Content Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Mobile Sidebar Toggle (Only visible when sidebar exists) */}
          {hasSidebar && (
            <div className="flex items-center px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] lg:hidden">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors duration-fast"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Menu
              </button>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
