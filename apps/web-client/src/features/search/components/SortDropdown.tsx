'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort_by') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort_by', e.target.value);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--accent)] focus:border-[var(--accent)] block w-full p-2.5 outline-none transition-colors shadow-sm cursor-pointer"
      >
        <option value="newest">Newest Listed</option>
        <option value="oldest">Oldest Listed</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="mileage_asc">Lowest Mileage</option>
        <option value="year_desc">Newest Year</option>
      </select>
    </div>
  );
}
