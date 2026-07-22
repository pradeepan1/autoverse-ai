'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function ClientSortDropdown({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = e.target.value;
    if (val) {
      params.set('sort', val);
    } else {
      params.delete('sort');
    }
    // Changing sort should probably reset to first page
    params.delete('skip');
    
    router.push(`/cars?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <select 
        value={currentSort} 
        onChange={handleSortChange} 
        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-2.5 px-4 text-[var(--text-primary)] text-sm font-medium focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all appearance-none cursor-pointer hover:border-zinc-500"
      >
        <option value="">Recommended</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="mileage_asc">Mileage: Low to High</option>
        <option value="mileage_desc">Mileage: High to Low</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[var(--text-muted)]">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </>
  );
}
