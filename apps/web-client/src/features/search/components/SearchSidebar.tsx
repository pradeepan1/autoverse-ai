'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SearchSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = React.useState({
    brand: searchParams.get('brand') || '',
    model: searchParams.get('model') || '',
    variant: searchParams.get('variant') || '',
    dealer: searchParams.get('dealer') || '',
    fuel_type: searchParams.get('fuel_type') || '',
    transmission: searchParams.get('transmission') || '',
    body_style: searchParams.get('body_style') || '',
    exterior_color: searchParams.get('exterior_color') || '',
    seating_capacity: searchParams.get('seating_capacity') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    min_mileage: searchParams.get('min_mileage') || '',
    max_mileage: searchParams.get('max_mileage') || '',
    min_year: searchParams.get('min_year') || '',
    max_year: searchParams.get('max_year') || '',
    location: searchParams.get('location') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    // Reset page to 0 on new search
    params.delete('skip');
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      model: '',
      variant: '',
      dealer: '',
      fuel_type: '',
      transmission: '',
      body_style: '',
      exterior_color: '',
      seating_capacity: '',
      min_price: '',
      max_price: '',
      min_mileage: '',
      max_mileage: '',
      min_year: '',
      max_year: '',
      location: '',
    });
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(filters).forEach(key => params.delete(key));
    params.delete('skip');
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl p-5 space-y-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">Filters</h3>
        <button onClick={clearFilters} className="text-sm font-medium text-[var(--accent)] hover:underline">
          Clear All
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Brand</label>
          <Input name="brand" value={filters.brand} onChange={handleChange} placeholder="e.g. Toyota" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Model</label>
            <Input name="model" value={filters.model} onChange={handleChange} placeholder="Model" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Variant</label>
            <Input name="variant" value={filters.variant} onChange={handleChange} placeholder="Trim" />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Price Range</label>
          <div className="flex items-center gap-2">
            <Input type="number" name="min_price" placeholder="Min" value={filters.min_price} onChange={handleChange} />
            <span className="text-[var(--text-muted)]">-</span>
            <Input type="number" name="max_price" placeholder="Max" value={filters.max_price} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Year</label>
          <div className="flex items-center gap-2">
            <Input type="number" name="min_year" placeholder="From" value={filters.min_year} onChange={handleChange} />
            <span className="text-[var(--text-muted)]">-</span>
            <Input type="number" name="max_year" placeholder="To" value={filters.max_year} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Mileage</label>
          <div className="flex items-center gap-2">
            <Input type="number" name="min_mileage" placeholder="Min mi" value={filters.min_mileage} onChange={handleChange} />
            <span className="text-[var(--text-muted)]">-</span>
            <Input type="number" name="max_mileage" placeholder="Max mi" value={filters.max_mileage} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Fuel</label>
            <select name="fuel_type" value={filters.fuel_type} onChange={handleChange} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md p-2.5 text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none">
              <option value="">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Transmission</label>
            <select name="transmission" value={filters.transmission} onChange={handleChange} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md p-2.5 text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none">
              <option value="">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Body Style</label>
            <select name="body_style" value={filters.body_style} onChange={handleChange} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md p-2.5 text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none">
              <option value="">Any</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Coupe">Coupe</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Seats</label>
            <Input type="number" name="seating_capacity" value={filters.seating_capacity} onChange={handleChange} placeholder="e.g. 5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Color</label>
            <Input name="exterior_color" value={filters.exterior_color} onChange={handleChange} placeholder="e.g. Black" />
          </div>
          <div>
            <label className="text-sm font-semibold text-[var(--text-secondary)] mb-1.5 block">Location</label>
            <Input name="location" value={filters.location} onChange={handleChange} placeholder="City, State" />
          </div>
        </div>

      </div>

      <div className="pt-4 sticky bottom-0 bg-[var(--bg-elevated)] pb-2 mt-4 border-t border-[var(--border-color)]">
        <Button onClick={applyFilters} className="w-full" variant="primary">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
