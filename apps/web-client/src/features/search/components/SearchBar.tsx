'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getSearchSuggestions } from '../api/search';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await getSearchSuggestions(query, 5);
        setSuggestions(res.suggestions);
      } catch (e) {
        console.error(e);
      }
    }, 300); // debounce
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent, overrideQuery?: string) => {
    e.preventDefault();
    const finalQuery = overrideQuery !== undefined ? overrideQuery : query;
    const params = new URLSearchParams(searchParams.toString());
    
    if (finalQuery) {
      params.set('q', finalQuery);
    } else {
      params.delete('q');
    }
    
    params.delete('skip'); // reset pagination
    setShowSuggestions(false);
    router.push(`/search?${params.toString()}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch({ preventDefault: () => {} } as React.FormEvent, suggestion);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <form onSubmit={(e) => handleSearch(e)} className="relative flex items-center">
        <div className="absolute left-4 text-[var(--text-muted)]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search by make, model, or keyword..."
          className="w-full pl-12 pr-24 py-4 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all shadow-sm"
        />
        <Button 
          type="submit" 
          variant="primary" 
          className="absolute right-2 top-2 bottom-2 rounded-full px-6 shadow-sm"
        >
          Search
        </Button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl shadow-lg overflow-hidden z-50">
          <ul className="py-2">
            {suggestions.map((suggestion, idx) => (
              <li 
                key={idx}
                className="px-4 py-3 hover:bg-[var(--bg-secondary)] cursor-pointer text-[var(--text-primary)] transition-colors flex items-center gap-3"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
