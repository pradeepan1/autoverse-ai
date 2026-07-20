import React, { Suspense } from 'react';
import { getCars } from '@/features/listings/api/cars';
import { CarCard, CarCardSkeleton } from '@/features/listings/components/CarCard';
import { CarFilters } from '@/features/listings/components/CarFilters';
import { Alert } from '@/components/ui/Alert';

export const metadata = {
  title: 'Car Inventory | AutoVerse AI',
  description: 'Browse our premium selection of luxury and performance vehicles.',
};

export default async function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Hero Section */}
      <div className="bg-zinc-900 border-b border-zinc-800 py-16 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Premium Vehicle Inventory
          </h1>
          <p className="text-lg text-zinc-400">
            Discover our curated collection of luxury, performance, and everyday vehicles.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <Suspense fallback={<div className="bg-zinc-900 h-96 rounded-xl animate-pulse"></div>}>
              <CarFilters />
            </Suspense>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <CarCardSkeleton key={i} />)}
              </div>
            }>
              <CarList searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

async function CarList({ searchParams }: { searchParams: any }) {
  try {
    // Clean up params
    const params: Record<string, string> = {};
    Object.keys(searchParams).forEach(key => {
      if (typeof searchParams[key] === 'string') {
        params[key] = searchParams[key];
      }
    });

    const data = await getCars(params);
    const cars = data.items;

    if (cars.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-zinc-800 border-dashed rounded-xl bg-zinc-900/30">
          <svg className="w-16 h-16 text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
          <p className="text-zinc-400 max-w-md">
            We couldn&apos;t find any cars matching your current filters. Try adjusting your criteria or clearing some filters.
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-6 flex justify-between items-center text-zinc-400 text-sm">
          <span>Showing <strong className="text-white">{cars.length}</strong> of <strong className="text-white">{data.total}</strong> vehicles</span>
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
        title="Error Loading Inventory"
        description="There was a problem communicating with our servers. Please try again later."
        className="bg-red-950/50 border-red-900/50"
      />
    );
  }
}
