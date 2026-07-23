"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCompare } from "../hooks/useCompare";
import { Button } from "@/components/ui/Button";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function CompareTray() {
  const { cars, removeCar, clearAll } = useCompare();
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cars.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[60] w-full max-w-4xl sm:px-4 sm:bottom-4 pointer-events-none transition-all duration-300">
      <div 
        className={cn(
          "pointer-events-auto bg-[var(--bg-elevated)]/95 backdrop-blur-xl border border-[var(--border-color)] shadow-2xl transition-all duration-500 ease-out flex flex-col",
          "w-full sm:rounded-2xl overflow-hidden",
          isExpanded ? "translate-y-0" : "translate-y-[calc(100%-48px)] sm:translate-y-[calc(100%-52px)]"
        )}
      >
        {/* Header / Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-12 sm:h-13 px-4 sm:px-6 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Compare Vehicles ({cars.length}/4)
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isExpanded ? <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" /> : <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />}
          </div>
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 sm:items-end">
          
          <div className="flex-1 flex gap-3 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {cars.map((car) => {
              const primaryImage = car.images?.find((img) => img.is_primary) || car.images?.[0];
              const imageUrl = primaryImage?.image_url || "/placeholder-car.webp";
              
              return (
                <div key={car.id} className="relative w-24 sm:w-32 flex-shrink-0 group">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                    <Image 
                      src={imageUrl} 
                      alt={car.car_model?.name || "Vehicle"} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[10px] sm:text-xs font-semibold text-[var(--text-primary)] truncate">
                      {car.brand?.name}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate">
                      {car.car_model?.name}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCar(car.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-sm flex items-center justify-center text-[var(--text-muted)] hover:text-red-500 hover:border-red-500/50 transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}

            {/* Empty Slots */}
            {Array.from({ length: 4 - cars.length }).map((_, i) => (
              <div key={`empty-${i}`} className="w-24 sm:w-32 flex-shrink-0">
                <div className="aspect-[4/3] rounded-lg border border-dashed border-[var(--border-color)] flex flex-col items-center justify-center gap-2 bg-[var(--bg-secondary)]/30">
                  <span className="text-xs font-medium text-[var(--text-muted)]">Add Car</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex sm:flex-col gap-3 sm:gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-[var(--border-color)] pt-4 sm:pt-0 sm:pl-6">
            {cars.length < 2 ? (
              <Button disabled variant="primary" className="flex-1 sm:w-32 text-xs h-10">
                Select more
              </Button>
            ) : (
              <Link href="/compare" className="flex-1 sm:w-32">
                <Button variant="primary" className="w-full text-xs h-10">
                  Compare
                </Button>
              </Link>
            )}
            <Button 
              variant="secondary" 
              onClick={clearAll} 
              className="flex-1 sm:w-32 text-xs h-10 border-transparent hover:bg-red-500/10 hover:text-red-500"
            >
              Clear All
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
