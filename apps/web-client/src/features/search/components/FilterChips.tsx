'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (value && key !== 'skip' && key !== 'limit' && key !== 'sort_by') {
      filters[key] = value;
    }
  });
  
  if (Object.keys(filters).length === 0) return null;

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete('skip');
    router.push(`/search?${params.toString()}`);
  };

  const formatKey = (key: string) => {
    return key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-[var(--text-muted)] mr-2">Active Filters:</span>
      {Object.entries(filters).map(([key, value]) => (
        <div 
          key={key} 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"
        >
          <span className="font-medium text-[var(--text-secondary)]">{formatKey(key)}:</span>
          <span>{value}</span>
          <button 
            onClick={() => removeFilter(key)}
            className="ml-1 text-[var(--text-muted)] hover:text-[var(--accent)] focus:outline-none transition-colors"
            aria-label={`Remove ${key} filter`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button 
        onClick={() => router.push('/search')}
        className="text-sm font-medium text-[var(--accent)] hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
}
