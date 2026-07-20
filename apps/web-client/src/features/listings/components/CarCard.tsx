'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { Car } from '../types/car';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const primaryImage = car.images?.find(img => img.is_primary) || car.images?.[0];
  const imageUrl = primaryImage?.image_url || '/placeholder-car.webp'; // Fallback
  const title = `${car.brand?.name || 'Unknown'} ${car.car_model?.name || 'Model'} ${car.year}`;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage) + ' mi';
  };

  return (
    <Card className="group overflow-hidden bg-zinc-900/50 border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
      <Link href={`/cars/${car.id}`} className="block relative aspect-[16/10] overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {car.condition === 'new' && (
            <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">New</Badge>
          )}
          {car.condition === 'used' && (
            <Badge variant="default" className="bg-zinc-900/80 backdrop-blur-md">Used</Badge>
          )}
        </div>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
      </Link>
      
      <CardBody className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/cars/${car.id}`}>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                {title}
              </h3>
            </Link>
            <p className="text-zinc-400 text-sm">{car.car_model?.body_style || 'Vehicle'}</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-blue-500">{formatPrice(car.price)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm text-zinc-300">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="truncate">{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="truncate">{car.vin.substring(0, 8)}...</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-800/50">
          <Button variant="secondary" className="flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300">
            Compare
          </Button>
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-500 hover:bg-red-500/10 w-9 p-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export function CarCardSkeleton() {
  return (
    <SkeletonCard />
  );
}
