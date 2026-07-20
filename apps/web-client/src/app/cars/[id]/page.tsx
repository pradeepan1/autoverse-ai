import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCar } from '@/features/listings/api/cars';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const car = await getCar(params.id);
    return {
      title: `${car.year} ${car.brand?.name} ${car.car_model?.name} | AutoVerse AI`,
      description: `View details for this ${car.year} ${car.brand?.name} ${car.car_model?.name}.`,
    };
  } catch (e) {
    return {
      title: 'Car Not Found',
    };
  }
}

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  try {
    const car = await getCar(params.id);

    const title = `${car.year} ${car.brand?.name || ''} ${car.car_model?.name || ''}`;
    const primaryImage = car.images?.find(img => img.is_primary) || car.images?.[0];
    const imageUrl = primaryImage?.image_url || '/placeholder-car.webp';

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price);
    };

    const formatMileage = (mileage: number) => {
      return new Intl.NumberFormat('en-US').format(mileage) + ' miles';
    };

    return (
      <div className="min-h-screen bg-zinc-950 pb-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <Link href="/cars" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Inventory
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {car.condition === 'new' && <Badge className="bg-blue-600">New Vehicle</Badge>}
                {car.condition === 'used' && <Badge variant="default" className="text-zinc-300 border-zinc-700">Pre-Owned</Badge>}
                {car.condition === 'certified' && <Badge className="bg-emerald-600">Certified Pre-Owned</Badge>}
                <span className="text-zinc-400 text-sm">VIN: {car.vin}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{title}</h1>
              <p className="text-zinc-400 mt-2 text-lg">{car.car_model?.body_style || 'Vehicle'}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl font-extrabold text-blue-500">{formatPrice(car.price)}</div>
              <p className="text-zinc-400 text-sm mt-1">Excludes taxes & fees</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative aspect-video md:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          {/* Thumbnails could go here if we had multiple images properly setup */}
          {car.images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto py-4 mt-2 no-scrollbar">
              {car.images.map(img => (
                <div key={img.id} className={`relative h-24 w-40 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${img.is_primary ? 'border-blue-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                   <Image src={img.image_url} alt="Thumbnail" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Specs */}
            <div className="flex-1 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Vehicle Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                    <p className="text-sm text-zinc-400 mb-1">Mileage</p>
                    <p className="font-semibold text-white">{formatMileage(car.mileage)}</p>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                    <p className="text-sm text-zinc-400 mb-1">Fuel Type</p>
                    <p className="font-semibold text-white">{car.fuel_type}</p>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                    <p className="text-sm text-zinc-400 mb-1">Transmission</p>
                    <p className="font-semibold text-white">{car.transmission}</p>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                    <p className="text-sm text-zinc-400 mb-1">Exterior Color</p>
                    <p className="font-semibold text-white capitalize">{car.exterior_color || 'N/A'}</p>
                  </div>
                </div>
              </section>

              {car.features && Object.keys(car.features).length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Features & Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {Object.entries(car.features).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-zinc-300 capitalize">{key.replace(/_/g, ' ')}: {String(value)}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Dealer & CTA */}
            <div className="w-full lg:w-96 shrink-0">
              <div className="sticky top-24 space-y-6">
                <Card className="bg-zinc-900 border-zinc-800 p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Interested in this car?</h3>
                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg">
                      Contact Dealer
                    </Button>
                    <Button variant="secondary" className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                      Schedule Test Drive
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t border-zinc-800">
                    <p className="text-sm text-zinc-400 font-medium mb-3">Share this vehicle</p>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Copy Link
                      </Button>
                      <Button variant="secondary" size="sm" className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-2">Dealer Information</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Premium Auto Dealership</p>
                      <p className="text-sm text-zinc-400">View all inventory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
