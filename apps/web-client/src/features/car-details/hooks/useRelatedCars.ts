import { useState, useEffect } from "react";
import { carDetailsService } from "../services/carDetails.service";
import { CarDetails } from "../types";

export function useRelatedCars(currentCar: CarDetails | null) {
  const [data, setData] = useState<CarDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchRelated() {
      if (!currentCar) return;
      setIsLoading(true);
      try {
        // Find cars of same brand, and roughly similar price +- 20%
        const minPrice = currentCar.price * 0.8;
        const maxPrice = currentCar.price * 1.2;
        const brandSlug = currentCar.brand?.slug;

        const cars = await carDetailsService.getRelatedCars(brandSlug, minPrice, maxPrice);
        
        // Exclude current car from related
        if (mounted) {
          setData(cars.filter(c => c.id !== currentCar.id).slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch related cars", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRelated();

    return () => {
      mounted = false;
    };
  }, [currentCar]);

  return { data, isLoading };
}
