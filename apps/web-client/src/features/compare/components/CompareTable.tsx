"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarDetails } from "@/features/car-details/types";
import { Button } from "@/components/ui/Button";
import { X, Check } from "lucide-react";
import { useCompare } from "../hooks/useCompare";
import { cn } from "@/lib/utils/cn";

interface CompareTableProps {
  cars: CarDetails[];
  showDifferences: boolean;
}

interface SpecRow {
  label: string;
  key: string;
  render: (_car: CarDetails) => React.ReactNode;
  getValue: (_car: CarDetails) => any;
}

interface SpecSection {
  title: string;
  rows: SpecRow[];
}

export function CompareTable({ cars, showDifferences }: CompareTableProps) {
  const { removeCar } = useCompare();

  const sections: SpecSection[] = useMemo(() => [
    {
      title: "Overview",
      rows: [
        { label: "Price", key: "price", getValue: (c) => c.price, render: (c) => <span className="font-bold text-[var(--text-primary)]">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(c.price)}</span> },
        { label: "Year", key: "year", getValue: (c) => c.year, render: (c) => c.year },
        { label: "Mileage", key: "mileage", getValue: (c) => c.mileage, render: (c) => `${new Intl.NumberFormat('en-IN').format(c.mileage)} km` },
        { label: "Condition", key: "condition", getValue: (c) => c.condition, render: (c) => <span className="uppercase text-xs tracking-wider font-bold text-[var(--accent)]">{c.condition}</span> },
      ]
    },
    {
      title: "Performance",
      rows: [
        { label: "Engine", key: "engine", getValue: (c) => c.features?.engine, render: (c) => c.features?.engine || "--" },
        { label: "Horsepower", key: "horsepower", getValue: (c) => c.features?.horsepower, render: (c) => c.features?.horsepower || "--" },
        { label: "Torque", key: "torque", getValue: (c) => c.features?.torque, render: (c) => c.features?.torque || "--" },
        { label: "Fuel Type", key: "fuel", getValue: (c) => c.fuel_type, render: (c) => c.fuel_type },
        { label: "Transmission", key: "transmission", getValue: (c) => c.transmission, render: (c) => c.transmission },
        { label: "Drive Type", key: "drive_type", getValue: (c) => c.features?.drive_type, render: (c) => c.features?.drive_type || "--" },
      ]
    },
    {
      title: "Dimensions",
      rows: [
        { label: "Body Style", key: "body_style", getValue: (c) => c.car_model?.body_style, render: (c) => c.car_model?.body_style || "--" },
        { label: "Doors", key: "doors", getValue: (c) => c.features?.doors, render: (c) => c.features?.doors || "--" },
        { label: "Seats", key: "seats", getValue: (c) => c.features?.seats, render: (c) => c.features?.seats || "--" },
      ]
    },
    {
      title: "Features",
      rows: [
        { label: "Safety", key: "safety", getValue: (c) => c.features?.safety?.join(','), render: (c) => c.features?.safety ? <div className="flex flex-col gap-1.5 text-xs text-[var(--text-secondary)]">{c.features.safety.map((s: string) => <span key={s} className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0"/>{s}</span>)}</div> : "--" },
        { label: "Comfort", key: "comfort", getValue: (c) => c.features?.comfort?.join(','), render: (c) => c.features?.comfort ? <div className="flex flex-col gap-1.5 text-xs text-[var(--text-secondary)]">{c.features.comfort.map((s: string) => <span key={s} className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0"/>{s}</span>)}</div> : "--" },
        { label: "Entertainment", key: "entertainment", getValue: (c) => c.features?.entertainment?.join(','), render: (c) => c.features?.entertainment ? <div className="flex flex-col gap-1.5 text-xs text-[var(--text-secondary)]">{c.features.entertainment.map((s: string) => <span key={s} className="flex items-start gap-1.5"><Check className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0"/>{s}</span>)}</div> : "--" },
      ]
    },
    {
      title: "Dealer Information",
      rows: [
        { label: "Dealer Status", key: "dealer", getValue: (c) => c.dealer?.id, render: (c) => c.dealer?.id ? <span className="text-emerald-600 font-semibold text-xs">Verified Partner</span> : "N/A" },
      ]
    }
  ], []);

  const filteredSections = useMemo(() => {
    return sections.map(section => {
      const filteredRows = section.rows.filter(row => {
        if (!showDifferences || cars.length <= 1) return true;
        const firstVal = row.getValue(cars[0]);
        for (let i = 1; i < cars.length; i++) {
          if (row.getValue(cars[i]) !== firstVal) return true;
        }
        return false;
      });
      return { ...section, rows: filteredRows };
    }).filter(section => section.rows.length > 0);
  }, [sections, showDifferences, cars]);

  return (
    <div className="w-full overflow-x-auto pb-8 hide-scrollbar animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="min-w-[800px] grid" style={{ gridTemplateColumns: `200px repeat(${cars.length}, minmax(280px, 1fr))` }}>
        
        {/* Header Row (Sticky Header) */}
        <div className="sticky top-[72px] z-20 bg-[var(--bg-primary)] py-4 border-b border-[var(--border-color)] flex items-end font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
          Models
        </div>
        {cars.map(car => {
          const primaryImage = car.images?.find((img) => img.is_primary) || car.images?.[0];
          const imageUrl = primaryImage?.image_url || "/placeholder-car.webp";
          return (
            <div key={`header-${car.id}`} className="sticky top-[72px] z-20 bg-[var(--bg-primary)] p-4 border-b border-[var(--border-color)]">
              <div className="relative group">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
                  <Image src={imageUrl} alt={car.car_model?.name || "Vehicle"} fill className="object-cover" />
                </div>
                <button
                  onClick={() => removeCar(car.id)}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] shadow-lg flex items-center justify-center text-[var(--text-muted)] hover:text-red-500 hover:border-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove vehicle"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">{car.brand?.name}</h3>
                <Link href={`/cars/${car.id}`} className="hover:text-[var(--accent)] transition-colors">
                  <h4 className="text-lg font-extrabold text-[var(--text-primary)] leading-tight mt-1">{car.car_model?.name}</h4>
                </Link>
                <div className="mt-3">
                  <Link href={`/cars/${car.id}`}>
                    <Button variant="secondary" size="sm" className="w-full text-xs h-9">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Data Rows */}
        {filteredSections.map(section => (
          <React.Fragment key={section.title}>
            {/* Section Header */}
            <div className="col-span-full bg-[var(--bg-secondary)]/50 px-4 py-3 mt-8 border-y border-[var(--border-color)] flex items-center font-bold text-[var(--text-primary)] text-sm tracking-wide shadow-inner">
              {section.title}
            </div>
            
            {section.rows.map((row, rowIndex) => (
              <React.Fragment key={`${section.title}-${row.key}`}>
                {/* Row Label */}
                <div className={cn(
                  "px-4 py-5 font-medium text-sm text-[var(--text-secondary)] border-b border-[var(--border-color)]/50 flex items-center",
                  rowIndex % 2 === 0 ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-primary)]"
                )}>
                  {row.label}
                </div>
                
                {/* Row Data for each car */}
                {cars.map((car, _colIndex) => {
                  let isDifferent = false;
                  if (showDifferences && cars.length > 1) {
                    const firstVal = row.getValue(cars[0]);
                    for (let i = 1; i < cars.length; i++) {
                      if (row.getValue(cars[i]) !== firstVal) {
                        isDifferent = true;
                        break;
                      }
                    }
                  }

                  return (
                    <div key={`${car.id}-${row.key}`} className={cn(
                      "px-4 py-5 text-sm border-b border-[var(--border-color)]/50 flex items-center transition-colors duration-300",
                      rowIndex % 2 === 0 ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-primary)]",
                      isDifferent ? "bg-[var(--accent)]/5 border-x border-[var(--accent)]/10" : ""
                    )}>
                      <span className={isDifferent ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-primary)]"}>
                        {row.render(car)}
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
