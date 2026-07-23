"use client";

import { useWishlist } from "@/features/wishlist/context/WishlistProvider";
import { useCompare } from "@/features/compare/hooks/useCompare";
import { CarDetails } from "../types";
import { Button } from "@/components/ui/Button";
import { Heart, MessageSquare, LineChart, Scale, Share2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StickyActionsProps {
  car: CarDetails;
  onShareClick: () => void;
}

export function StickyActions({ car, onShareClick }: StickyActionsProps) {
  const { isInWishlist, addItem, removeItemByCarId, isLoading: wishlistLoading } = useWishlist();
  const saved = isInWishlist(car.id);
  const { isComparing, addCar, removeCar, isLoading: compareLoading } = useCompare();
  const comparing = isComparing(car.id);

  const handleWishlistToggle = () => {
    if (saved) {
      removeItemByCarId(car.id);
    } else {
      addItem(car.id);
    }
  };

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Desktop Share Button */}
      <div className="hidden lg:flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onShareClick}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
        <Button 
          variant={saved ? "secondary" : "primary"}
          size="lg"
          className="w-full flex items-center justify-center gap-2 font-bold shadow-lg shadow-[var(--gold)]/20"
          onClick={handleWishlistToggle}
          disabled={wishlistLoading}
        >
          <Heart className={cn("w-5 h-5", saved ? "fill-[var(--error)] text-[var(--error)]" : "")} />
          {saved ? "Saved to Wishlist" : "Save to Wishlist"}
        </Button>

        <Button variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Contact Dealer
        </Button>

        <div className="h-px bg-[var(--border-color)] w-full my-2" />

        <div className="flex flex-col gap-3">
          <Button variant="ghost" size="md" className="w-full flex items-center justify-start gap-3 opacity-60 cursor-not-allowed border border-[var(--border-color)]" title="Coming in Module 6">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
              <LineChart className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-[var(--text-primary)]">AI Price Analysis</span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-bold">Coming Soon</span>
            </div>
          </Button>

          <Button 
            variant="ghost" 
            size="md" 
            className={cn("w-full flex items-center justify-start gap-3 border border-[var(--border-color)] transition-colors", comparing ? "bg-[var(--bg-secondary)]" : "")} 
            onClick={() => comparing ? removeCar(car.id) : addCar(car.id)}
            disabled={compareLoading && !comparing}
          >
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", comparing ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-secondary)]")}>
              <Scale className={cn("w-4 h-4", comparing ? "text-white" : "text-[var(--accent)]")} />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-[var(--text-primary)]">
                {comparing ? "Added to Compare" : "Compare Vehicle"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
