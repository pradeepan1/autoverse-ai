"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Scale, Search } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export function EmptyCompare() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-6 shadow-inner">
        <Scale className="w-12 h-12 text-[var(--text-muted)] opacity-50" />
      </div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
        No vehicles selected
      </h2>
      <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
        Add up to 4 vehicles to compare their features, specifications, and performance side by side.
      </p>
      <Link href={ROUTES.SEARCH}>
        <Button variant="primary" size="lg" className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Browse Cars
        </Button>
      </Link>
    </div>
  );
}
