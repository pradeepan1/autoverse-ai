"use client";

import React, { useState, useEffect } from "react";
import { useCompare } from "@/features/compare/hooks/useCompare";
import { CompareTable } from "@/features/compare/components/CompareTable";
import { CompareToolbar } from "@/features/compare/components/CompareToolbar";
import { EmptyCompare } from "@/features/compare/components/EmptyCompare";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export function ComparePageClient() {
  const { cars, isLoading } = useCompare();
  const [showDifferences, setShowDifferences] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Compare Vehicles" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="av-container">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight">
            Compare Vehicles
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            Analyze specifications, performance, and features side by side to find your perfect vehicle.
          </p>
        </div>

        {cars.length === 0 ? (
          <EmptyCompare />
        ) : (
          <>
            <CompareToolbar 
              showDifferences={showDifferences} 
              setShowDifferences={setShowDifferences} 
            />
            
            {isLoading && (
              <div className="w-full flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" />
              </div>
            )}
            
            <CompareTable cars={cars} showDifferences={showDifferences} />
          </>
        )}
      </div>
    </div>
  );
}
