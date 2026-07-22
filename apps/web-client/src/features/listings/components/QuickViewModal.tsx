'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@/components/ui';
import { Button } from '@/components/ui';
import { Car } from '../types/car';
import Link from 'next/link';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

export function QuickViewModal({ isOpen, onClose, car }: QuickViewModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!car) return null;

  // Ensure we have an array of images to display, duplicating the primary if needed
  const primaryImage = car.images?.find(img => img.is_primary) || car.images?.[0];
  const fallbackUrl = primaryImage?.image_url || '/placeholder-car.webp';
  
  // Ensure we have an array of images to display
  const gallery = car.images && car.images.length > 0 
    ? car.images 
    : [{ id: 'fallback', image_url: fallbackUrl, is_primary: true, display_order: 0, car_id: car.id }];

  const title = `${car.brand?.name || 'Unknown'} ${car.car_model?.name || 'Model'} ${car.year}`;
  
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

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      size="xl"
      hideHeader={true}
    >
      <div className="flex flex-col lg:flex-row max-h-[85vh] overflow-y-auto custom-scrollbar">
        
        {/* Left Side: Gallery */}
        <div className="w-full lg:w-3/5 bg-[var(--bg-secondary)] relative flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative aspect-[4/3] w-full bg-zinc-950">
            <Image
              src={gallery[activeImageIndex]?.image_url || fallbackUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          
          <div className="flex gap-2 p-4 overflow-x-auto custom-scrollbar bg-[var(--bg-secondary)]">
            {gallery.map((img, idx) => (
              <button
                key={img.id + idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 aspect-[4/3] shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImageIndex === idx ? 'border-[var(--accent)]' : 'border-transparent hover:border-zinc-500'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-2/5 flex flex-col bg-[var(--bg-elevated)] relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden lg:flex"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="p-6 lg:p-8 flex-1 flex flex-col">
            <div className="mb-6 pr-8">
              <div className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-1">
                {car.brand?.name} • {car.car_model?.body_style || 'Vehicle'}
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                {title}
              </h2>
              <div className="text-3xl font-bold text-[var(--accent)]">
                {formatPrice(car.price)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-[var(--bg-elevated)] rounded-lg text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Mileage</p>
                  <p className="font-semibold text-[var(--text-primary)]">{formatMileage(car.mileage)}</p>
                </div>
              </div>
              
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-[var(--bg-elevated)] rounded-lg text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Fuel</p>
                  <p className="font-semibold text-[var(--text-primary)]">{car.fuel_type}</p>
                </div>
              </div>
              
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-[var(--bg-elevated)] rounded-lg text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Transmission</p>
                  <p className="font-semibold text-[var(--text-primary)]">{car.transmission}</p>
                </div>
              </div>
              
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-[var(--bg-elevated)] rounded-lg text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Condition</p>
                  <p className="font-semibold text-[var(--text-primary)] capitalize">{car.condition}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">Exterior Color</span>
                <span className="font-medium text-[var(--text-primary)]">{car.exterior_color || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">Interior Color</span>
                <span className="font-medium text-[var(--text-primary)]">{car.interior_color || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[var(--border-color)]">
                <span className="text-[var(--text-secondary)]">VIN</span>
                <span className="font-mono text-sm text-[var(--text-primary)]">{car.vin}</span>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              <Link href={`/cars/${car.id}`} onClick={onClose} className="block w-full">
                <Button variant="primary" className="w-full py-6 text-lg rounded-xl shadow-[0_8px_30px_rgb(0,112,243,0.3)] hover:shadow-[0_8px_40px_rgb(0,112,243,0.5)] transition-shadow">
                  View Full Details
                </Button>
              </Link>
              <Button variant="secondary" className="w-full py-6 text-lg rounded-xl">
                Contact Dealer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
