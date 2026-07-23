"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CarImage } from "../types";

interface ImageGalleryProps {
  images: CarImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayImages = images.length > 0 
    ? [...images].sort((a, b) => a.display_order - b.display_order)
    : [];

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, handlePrevious, handleNext]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scrollRef.current) {
      const activeThumbnail = scrollRef.current.children[currentIndex] as HTMLElement;
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [currentIndex]);

  if (displayImages.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center">
        <span className="text-[var(--text-muted)]">No images available</span>
      </div>
    );
  }

  const renderContent = (fullscreen: boolean) => (
    <div className={cn("relative group", fullscreen ? "w-full h-full flex flex-col" : "w-full")}>
      {/* Main Image */}
      <div className={cn("relative overflow-hidden bg-black", fullscreen ? "flex-1" : "aspect-[16/9] rounded-2xl")}>
        <Image
          src={displayImages[currentIndex].image_url}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          priority={currentIndex === 0}
          className={cn(
            "object-cover transition-transform duration-700",
            fullscreen ? "object-contain" : "group-hover:scale-105"
          )}
        />
        
        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Fullscreen Toggle */}
        {!fullscreen && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        )}
        {fullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all z-50"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className={cn("mt-4 relative", fullscreen ? "px-4 pb-4" : "")}>
          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-1 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative flex-shrink-0 snap-center rounded-lg overflow-hidden transition-all duration-300",
                  fullscreen ? "w-24 aspect-[16/9]" : "w-20 sm:w-24 aspect-[16/9]",
                  currentIndex === idx 
                    ? "ring-2 ring-[var(--gold)] ring-offset-2 ring-offset-[var(--bg-primary)] opacity-100 scale-105" 
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img.image_url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {renderContent(false)}

      {/* Fullscreen Portal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <div className="w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
            {renderContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
