"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { CompareContextType } from "../types";
import { CarDetails } from "@/features/car-details/types";
import { compareService } from "../services/compare.service";
import { useToast } from "@/components/providers/ToastProvider";


export const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<CarDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // 1. Restore compare state from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem("av_compare_cars");
      if (stored) {
        setCars(JSON.parse(stored));
      }
    } catch {
      // Ignored
    }
  }, []);

  // 2. Persist state to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      window.localStorage.setItem("av_compare_cars", JSON.stringify(cars));
    }
  }, [cars, mounted]);

  const isComparing = useCallback(
    (carId: string) => {
      return cars.some((c) => c.id === carId);
    },
    [cars]
  );

  const addCar = async (carId: string) => {
    if (isComparing(carId)) {
      toast({
        variant: "info",
        title: "Already Added",
        description: "This vehicle is already in your comparison list.",
      });
      return;
    }

    if (cars.length >= 4) {
      toast({
        variant: "warning",
        title: "Comparison Limit Reached",
        description: "You can compare a maximum of 4 vehicles at a time.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const carData = await compareService.getCarForCompare(carId);
      setCars((prev) => [...prev, carData]);
      toast({
        variant: "success",
        title: "Added to Compare",
        description: `${carData.brand?.name} ${carData.car_model?.name} added to comparison.`,
      });
    } catch (err: any) {
      toast({
        variant: "error",
        title: "Action Failed",
        description: "Failed to add vehicle to comparison.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeCar = useCallback(
    (carId: string) => {
      setCars((prev) => prev.filter((c) => c.id !== carId));
      toast({
        variant: "info",
        title: "Removed",
        description: "Vehicle removed from comparison.",
      });
    },
    [toast]
  );

  const clearAll = useCallback(() => {
    setCars([]);
    toast({
      variant: "info",
      title: "Cleared",
      description: "All vehicles removed from comparison.",
    });
  }, [toast]);

  return (
    <CompareContext.Provider
      value={{
        cars,
        isLoading,
        addCar,
        removeCar,
        clearAll,
        isComparing,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
