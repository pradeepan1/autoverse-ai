'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function CarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Controlled states for filters
  const [filters, setFilters] = React.useState({
    brand_slug: searchParams.get('brand_slug') || '',
    condition: searchParams.get('condition') || '',
    fuel_type: searchParams.get('fuel_type') || '',
    transmission: searchParams.get('transmission') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    year: searchParams.get('year') || '',
    body_style: searchParams.get('body_style') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    router.push(`/cars?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      brand_slug: '',
      condition: '',
      fuel_type: '',
      transmission: '',
      min_price: '',
      max_price: '',
      year: '',
      body_style: '',
    });
    router.push('/cars');
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-6 sticky top-24">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Refine Search</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Brand</label>
          <select 
            name="brand_slug" 
            value={filters.brand_slug} 
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Brands</option>
            <option value="toyota">Toyota</option>
            <option value="bmw">BMW</option>
            <option value="mercedes-benz">Mercedes-Benz</option>
            <option value="audi">Audi</option>
            <option value="porsche">Porsche</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Body Style</label>
          <select 
            name="body_style" 
            value={filters.body_style} 
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Any Body Style</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Truck">Truck</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Condition</label>
          <select 
            name="condition" 
            value={filters.condition} 
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Any Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="certified">Certified Pre-Owned</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Price Range</label>
          <div className="flex items-center gap-2">
            <Input 
              type="number" 
              name="min_price"
              placeholder="Min" 
              value={filters.min_price}
              onChange={handleChange}
              className="bg-zinc-950 border-zinc-800"
            />
            <span className="text-zinc-500">-</span>
            <Input 
              type="number" 
              name="max_price"
              placeholder="Max" 
              value={filters.max_price}
              onChange={handleChange}
              className="bg-zinc-950 border-zinc-800"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Fuel Type</label>
          <select 
            name="fuel_type" 
            value={filters.fuel_type} 
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Any Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Transmission</label>
          <select 
            name="transmission" 
            value={filters.transmission} 
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-md p-2.5 text-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Any Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-400 mb-1 block">Year</label>
          <Input 
            type="number" 
            name="year"
            placeholder="e.g. 2023" 
            value={filters.year}
            onChange={handleChange}
            className="bg-zinc-950 border-zinc-800"
          />
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Button onClick={applyFilters} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="secondary" className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300">
          Reset All
        </Button>
      </div>
    </div>
  );
}
