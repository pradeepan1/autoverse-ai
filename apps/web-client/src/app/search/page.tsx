import React, { Suspense } from 'react';
import { searchCars } from '@/features/search/api/search';
import { CarCard, CarCardSkeleton } from '@/features/listings/components/CarCard';
import { SearchSidebar } from '@/features/search/components/SearchSidebar';
import { SearchBar } from '@/features/search/components/SearchBar';
import { FilterChips } from '@/features/search/components/FilterChips';
import { SortDropdown } from '@/features/search/components/SortDropdown';
import { Alert } from '@/components/ui/Alert';

export const metadata = {
  title: 'Advanced Search | AutoVerse AI',
  description: 'Find your perfect vehicle with our advanced search and smart filtering capabilities.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-20 pt-16">
      {/* Hero Section */}
      <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] py-12 px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Advanced <span className="text-[var(--accent)]">Search</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Find exactly what you&apos;re looking for with our smart filtering tools.
          </p>
          <SearchBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <Suspense fallback={<div className="bg-[var(--bg-elevated)] h-96 rounded-xl animate-pulse"></div>}>
              <SearchSidebar />
            </Suspense>
          </aside>

          {/* Grid */}
          <main className="flex-1 min-w-0">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
                {[1, 2, 3, 4, 5, 6].map(i => <CarCardSkeleton key={i} />)}
              </div>
            }>
              <SearchResults searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

async function SearchResults({ searchParams }: { searchParams: any }) {
  try {
    // Clean up params
    const params: Record<string, any> = {};
    Object.keys(searchParams).forEach(key => {
      if (typeof searchParams[key] === 'string') {
        params[key] = searchParams[key];
      }
    });

    const data = await searchCars(params);
    const cars = data.items;

    if (cars.length === 0) {
      return (
        <div>
          <FilterChips />
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-[var(--border-color)] border-dashed rounded-xl bg-[var(--bg-elevated)]/50 mt-4">
            <svg className="w-16 h-16 text-[var(--text-muted)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No results found</h3>
            <p className="text-[var(--text-secondary)] max-w-md">
              We couldn&apos;t find any vehicles matching your search criteria. Try adjusting your filters or search term.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <FilterChips />
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--border-color)] pb-4">
          <span className="text-[var(--text-secondary)] text-sm">
            Showing <strong className="text-[var(--text-primary)]">{cars.length}</strong> of <strong className="text-[var(--text-primary)]">{data.total}</strong> results
          </span>
          <SortDropdown />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <Alert 
        variant="error" 
        title="Search Unavailable"
        description="We couldn't connect to our search services. Please try again in a moment."
        className="mt-8"
      />
    );
  }
}
