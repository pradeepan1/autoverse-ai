'use client';

import React, { useState, useEffect } from 'react';
import { CarFilters } from './CarFilters';

export function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Sticky Bottom Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3.5 rounded-full font-bold shadow-2xl shadow-black/50 hover:scale-105 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters & Sort
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-primary)] rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : 'translate-y-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Filters</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 bg-[var(--bg-secondary)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto custom-scrollbar flex-1 pb-10 bg-[var(--bg-secondary)]/30">
           {/* We remove the padding from CarFilters when inside mobile to save space, but it's fine for now */}
           <CarFilters onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}
