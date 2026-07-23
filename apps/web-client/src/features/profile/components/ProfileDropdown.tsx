"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

interface ProfileDropdownProps {
  isHero?: boolean;
  isScrolled?: boolean;
}

export function ProfileDropdown({ isHero, isScrolled }: ProfileDropdownProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!user) return null;

  const dashboardRoute =
    user.role === "admin"
      ? ROUTES.ADMIN_DASHBOARD
      : user.role === "dealer"
      ? ROUTES.DEALER_DASHBOARD
      : ROUTES.DASHBOARD;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
          !isScrolled && isHero
            ? "text-white hover:bg-white/10"
            : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
        )}
      >
        <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 text-white font-bold text-xs uppercase shadow-sm">
          {user.full_name.charAt(0)}
        </div>
        <span className="text-sm font-semibold hidden lg:block">
          {user.full_name.split(" ")[0]}
        </span>
        <ChevronDown className={cn("w-4 h-4 hidden lg:block transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-100 z-50 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="px-4 py-3 border-b border-[var(--border-color)]">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">
              {user.full_name}
            </p>
            <p className="text-xs text-[var(--text-secondary)] truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1" role="none">
            <Link
              href={dashboardRoute}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)] transition-colors"
              role="menuitem"
            >
              <User className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/profile/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)] transition-colors"
              role="menuitem"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>

          <div className="py-1 border-t border-[var(--border-color)]" role="none">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--error)] hover:bg-[var(--error-bg)] transition-colors"
              role="menuitem"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
