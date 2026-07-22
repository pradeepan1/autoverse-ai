'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function CarFilters({ onClose }: { onClose?: () => void }) {
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
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Reset to page 1 on filter change
    params.delete('skip');
    
    router.push(`/cars?${params.toString()}`, { scroll: true });
    
    if (onClose) onClose();
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
    
    // Keep sorting if it exists
    const sort = searchParams.get('sort');
    const params = new URLSearchParams();
    if (sort) params.set('sort', sort);
    
    router.push(`/cars?${params.toString()}`);
    if (onClose) onClose();
  };

  const formatCurrency = (val: string) => {
    if (!val) return '';
    return new Intl.NumberFormat('en-IN').format(parseInt(val));
  };

  const selectClass = "w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-sm font-medium focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all appearance-none cursor-pointer hover:border-zinc-500";
  
  const SelectChevron = () => (
    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[var(--text-muted)]">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl p-6 lg:p-7 space-y-7 sticky top-24 shadow-sm h-full max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Filters</h3>
        {Object.values(filters).some(Boolean) && (
          <button 
            onClick={clearFilters}
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        
        {/* Brand Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">Make</label>
          <div className="relative">
            <select name="brand_slug" value={filters.brand_slug} onChange={handleChange} className={selectClass}>
              <option value="">All Makes</option>
              <option value="toyota">Toyota</option>
              <option value="bmw">BMW</option>
              <option value="mercedes-benz">Mercedes-Benz</option>
              <option value="audi">Audi</option>
              <option value="porsche">Porsche</option>
              <option value="honda">Honda</option>
              <option value="tata">Tata</option>
              <option value="hyundai">Hyundai</option>
              <option value="kia">Kia</option>
            </select>
            <SelectChevron />
          </div>
        </div>

        {/* Body Style Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">Body Style</label>
          <div className="relative">
            <select name="body_style" value={filters.body_style} onChange={handleChange} className={selectClass}>
              <option value="">Any Body Style</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
            <SelectChevron />
          </div>
        </div>

        {/* Condition Radios */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">Condition</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: '', label: 'Any' },
              { id: 'new', label: 'New' },
              { id: 'used', label: 'Used' },
              { id: 'certified', label: 'Certified' },
            ].map((opt) => (
              <label 
                key={opt.id} 
                className={`flex items-center justify-center p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                  filters.condition === opt.id 
                    ? 'border-[var(--accent)] bg-blue-500/10 text-[var(--accent)]' 
                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-zinc-500'
                }`}
              >
                <input 
                  type="radio" 
                  name="condition" 
                  value={opt.id} 
                  checked={filters.condition === opt.id} 
                  onChange={handleChange} 
                  className="hidden" 
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">Price Range (₹)</label>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">₹</span>
              <input 
                type="number" 
                name="min_price"
                placeholder="Min" 
                value={filters.min_price}
                onChange={handleChange}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-2.5 pl-7 pr-3 text-[var(--text-primary)] text-sm font-medium focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all"
              />
            </div>
            <span className="text-[var(--text-muted)]">-</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">₹</span>
              <input 
                type="number" 
                name="max_price"
                placeholder="Max" 
                value={filters.max_price}
                onChange={handleChange}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl py-2.5 pl-7 pr-3 text-[var(--text-primary)] text-sm font-medium focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          
          {(filters.min_price || filters.max_price) && (
            <div className="text-xs text-[var(--accent)] font-medium text-center">
              {filters.min_price ? `₹${formatCurrency(filters.min_price)}` : '0'} 
              {' to '} 
              {filters.max_price ? `₹${formatCurrency(filters.max_price)}` : 'Any'}
            </div>
          )}
        </div>

        {/* Fuel & Transmission (Grid layout) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">Fuel</label>
            <div className="relative">
              <select name="fuel_type" value={filters.fuel_type} onChange={handleChange} className={selectClass}>
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <SelectChevron />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">Gearbox</label>
            <div className="relative">
              <select name="transmission" value={filters.transmission} onChange={handleChange} className={selectClass}>
                <option value="">Any</option>
                <option value="Automatic">Auto</option>
                <option value="Manual">Manual</option>
              </select>
              <SelectChevron />
            </div>
          </div>
        </div>

      </div>

      <div className="pt-6 border-t border-[var(--border-color)] flex flex-col gap-3">
        <Button onClick={applyFilters} className="w-full py-6 text-base font-bold shadow-lg shadow-blue-500/20 rounded-xl">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
