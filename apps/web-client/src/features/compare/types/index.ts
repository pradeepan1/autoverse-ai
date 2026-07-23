import { CarDetails } from "@/features/car-details/types";

export interface CompareState {
  cars: CarDetails[];
}

export interface CompareContextType {
  cars: CarDetails[];
  isLoading: boolean;
  addCar: (_carId: string) => Promise<void>;
  removeCar: (_carId: string) => void;
  clearAll: () => void;
  isComparing: (_carId: string) => boolean;
}
