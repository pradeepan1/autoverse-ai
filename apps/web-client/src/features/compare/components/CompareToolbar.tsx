"use client";

import React from "react";
import { useCompare } from "../hooks/useCompare";
import { Button } from "@/components/ui/Button";

interface CompareToolbarProps {
  showDifferences: boolean;
  setShowDifferences: (_val: boolean) => void;
}

export function CompareToolbar({ showDifferences, setShowDifferences }: CompareToolbarProps) {
  const { clearAll } = useCompare();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer relative group">
          <input 
            type="checkbox" 
            className="peer sr-only" 
            checked={showDifferences}
            onChange={(e) => setShowDifferences(e.target.checked)}
          />
          <div className="w-10 h-6 bg-[var(--bg-secondary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)] shadow-inner"></div>
          <span className="text-sm font-semibold text-[var(--text-primary)] select-none">
            Show Differences Only
          </span>
        </label>
      </div>

      <div className="flex items-center justify-end">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={clearAll}
          className="text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white transition-colors"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
