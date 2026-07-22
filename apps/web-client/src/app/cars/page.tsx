import React, { Suspense } from 'react';
import { getCars } from '@/features/listings/api/cars';
import { CarCard, CarCardSkeleton } from '@/features/listings/components/CarCard';
import { CarFilters } from '@/features/listings/components/CarFilters';
import { MobileFilterDrawer } from '@/features/listings/components/MobileFilterDrawer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: 'Premium Cars Marketplace | AutoVerse AI',
  description: 'Browse our exclusive selection of luxury and performance vehicles.',
};

export default async function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-20 relative">
      {/* Hero Section */}
      <div className="bg-[var(--bg-elevated)] border-b border-[var(--border-color)] py-16 px-6 lg:px-8 text-center relative overflow-hidden -mt-16 pt-32">
        <div className="absolute inset-0 bg-blue-900/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[var(--bg-primary)] to-[var(--bg-primary)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
            Our <span className="text-[var(--accent)]">Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">
            Discover a curated portfolio of pre-owned luxury, performance, and everyday premium vehicles.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <Suspense fallback={<div className="bg-[var(--bg-elevated)] h-[800px] rounded-2xl animate-pulse"></div>}>
              <CarFilters />
            </Suspense>
          </aside>

          {/* Grid Area */}
          <main className="flex-1 w-full min-w-0">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <CarCardSkeleton key={i} />)}
              </div>
            }>
              <CarList searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilterDrawer />
    </div>
  );
}

async function CarList({ searchParams }: { searchParams: any }) {
  try {
    // Clean up params and extract sort if provided
    const params: Record<string, string> = {};
    Object.keys(searchParams).forEach(key => {
      if (typeof searchParams[key] === 'string' && searchParams[key]) {
        params[key] = searchParams[key];
      }
    });

    // Pass the sort parameter directly to the backend
    const data = await getCars(params);
    const cars = data.items;
    const sort = params.sort;

    if (cars.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-28 px-4 text-center border border-[var(--border-color)] border-dashed rounded-3xl bg-[var(--bg-elevated)]/50 shadow-inner">
          <div className="w-24 h-24 mb-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">No Vehicles Match Your Criteria</h3>
          <p className="text-[var(--text-secondary)] max-w-md mb-8 leading-relaxed">
            We couldn&apos;t find any vehicles matching your exact filters. Try adjusting your price range, brand, or other criteria.
          </p>
          <Link href="/cars">
            <Button variant="primary" className="rounded-xl px-8 shadow-lg shadow-blue-500/20 text-base font-bold">
              Reset All Filters
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl p-4 shadow-sm">
          <span className="text-[var(--text-secondary)] text-sm font-medium">
            Showing <strong className="text-[var(--text-primary)] text-base">{cars.length}</strong> of <strong className="text-[var(--text-primary)] text-base">{data.total}</strong> premium vehicles
          </span>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] whitespace-nowrap">Sort By</label>
            <div className="relative w-full sm:w-48">
              <SortDropdown currentSort={sort || ''} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-red-500 mb-2">Error Loading Inventory</h3>
        <p className="text-red-400/80 mb-6 max-w-sm">We encountered a problem while connecting to our showroom database.</p>
        <Link href="/cars">
           <Button variant="secondary" className="text-red-500 hover:bg-red-500/10">Try Again</Button>
        </Link>
      </div>
    );
  }
}

// Client component for sorting dropdown to interact with router
import { ClientSortDropdown } from '@/features/listings/components/ClientSortDropdown';

function SortDropdown({ currentSort }: { currentSort: string }) {
  return <ClientSortDropdown currentSort={currentSort} />;
}
