import { useState, useEffect } from "react";
import { carDetailsService } from "../services/carDetails.service";
import { CarDetails } from "../types";

export function useCarDetails(id: string) {
  const [data, setData] = useState<CarDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCar() {
      setIsLoading(true);
      setError(null);
      try {
        const car = await carDetailsService.getCarById(id);
        if (mounted) {
          setData(car);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.response?.data?.message || err.message || "Failed to load car details");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      fetchCar();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  return { data, isLoading, error, refetch: () => setData(null) }; // Simple refetch stub
}
