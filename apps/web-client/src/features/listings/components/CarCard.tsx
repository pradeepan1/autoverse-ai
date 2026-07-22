'use client';

import React, { useState } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Car } from '../types/car';
import { QuickViewModal } from './QuickViewModal';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('capo-wishlist', []);
  const isWishlisted = wishlist.includes(car.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      setWishlist(wishlist.filter((id: string) => id !== car.id));
    } else {
      setWishlist([...wishlist, car.id]);
    }
  };

  const primaryImage = car.images?.find(img => img.is_primary) || car.images?.[0];
  const imageUrl = primaryImage?.image_url || '/placeholder-car.webp'; 
  const title = `${car.brand?.name || 'Unknown'} ${car.car_model?.name || 'Model'}`;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-IN').format(mileage) + ' km';
  };

  const conditionColors = {
    new: 'bg-blue-600/90 text-white backdrop-blur-md border border-blue-500/50',
    used: 'bg-zinc-800/90 text-zinc-100 backdrop-blur-md border border-zinc-700/50',
    certified: 'bg-emerald-600/90 text-white backdrop-blur-md border border-emerald-500/50',
  };

  const badgeClass = conditionColors[car.condition as keyof typeof conditionColors] || conditionColors.used;

  return (
    <>
      <Card className="group flex flex-col h-full bg-[var(--bg-elevated)] border border-[var(--border-color)] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 ease-out">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          <Link href={`/cars/${car.id}`}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-3 inset-x-3 flex justify-between items-start z-10 pointer-events-none">
            <div className="flex gap-2 flex-col items-start">
              <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md ${badgeClass}`}>
                {car.condition}
              </span>
              {car.price < 2000000 && ( // Example logical badge
                <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-[var(--accent)] text-white backdrop-blur-md border border-blue-400/50">
                  Great Price
                </span>
              )}
            </div>
            
            <button 
              onClick={(e) => { e.preventDefault(); toggleWishlist(); }}
              className="pointer-events-auto p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-black/50 hover:scale-110 transition-all z-20"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isWishlisted ? 1 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Bottom Badges */}
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="px-2 py-1 text-xs font-mono font-medium rounded bg-black/60 backdrop-blur-md text-white border border-white/10">
              {car.year}
            </span>
          </div>
          
          {/* Quick View Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <Button 
              variant="secondary" 
              className="pointer-events-auto bg-white/90 text-black hover:bg-white border-none shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              onClick={() => setIsQuickViewOpen(true)}
            >
              Quick View
            </Button>
          </div>
        </div>
        
        {/* Body Content */}
        <CardBody className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="flex-1 min-w-0">
              <Link href={`/cars/${car.id}`} className="block">
                <h3 className="text-lg font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                  {title}
                </h3>
              </Link>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">
                {car.car_model?.body_style || 'Vehicle'} • {car.exterior_color || 'Standard'}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl font-extrabold text-[var(--text-primary)] block tabular-nums">
                {formatPrice(car.price)}
              </span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-2 mb-5">
            <div className="bg-[var(--bg-secondary)] rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <svg className="w-4 h-4 text-[var(--text-muted)] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[11px] font-semibold text-[var(--text-primary)] truncate w-full">{car.fuel_type}</span>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <svg className="w-4 h-4 text-[var(--text-muted)] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="text-[11px] font-semibold text-[var(--text-primary)] truncate w-full">{car.transmission}</span>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-2 flex flex-col items-center justify-center text-center">
              <svg className="w-4 h-4 text-[var(--text-muted)] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[11px] font-semibold text-[var(--text-primary)] truncate w-full">{formatMileage(car.mileage)}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
             <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               {car.dealer?.id ? 'Dealer Assured' : 'Available'}
             </div>
             <Button variant="secondary" size="sm" className="h-8 text-xs font-semibold px-3 rounded-lg border-[var(--border-color)] bg-transparent hover:bg-[var(--bg-secondary)] group/btn relative overflow-hidden" disabled>
               <span className="group-hover/btn:opacity-0 transition-opacity">Compare</span>
               <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider">Coming Soon</span>
             </Button>
          </div>
        </CardBody>
      </Card>

      <QuickViewModal 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
        car={car} 
      />
    </>
  );
}

export function CarCardSkeleton() {
  return (
    <SkeletonCard className="h-[400px]" />
  );
}
