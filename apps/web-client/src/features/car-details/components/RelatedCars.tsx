"use client";

import { useRelatedCars } from "../hooks/useRelatedCars";
import { CarDetails } from "../types";
import { CarCard } from "@/features/listings/components/CarCard";

interface RelatedCarsProps {
  currentCar: CarDetails;
}

export function RelatedCars({ currentCar }: RelatedCarsProps) {
  const { data: relatedCars, isLoading } = useRelatedCars(currentCar);

  if (isLoading) {
    return (
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Similar Vehicles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-[var(--bg-secondary)] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!relatedCars || relatedCars.length === 0) {
    return null; // Don't show the section if no related cars
  }

  return (
    <section className="mt-16 pt-16 border-t border-[var(--border-color)]">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Similar Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedCars.map((car) => (
          <CarCard key={car.id} car={car as any} /> 
          // Note: CarCard might expect a slightly different type if it relies on a different domain type, 
          // but CarDetails is a superset of the standard car list item.
        ))}
      </div>
    </section>
  );
}
