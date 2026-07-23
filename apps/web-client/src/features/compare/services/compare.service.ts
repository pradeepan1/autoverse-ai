import { apiClient } from "@/lib/api/client";
import { CarDetails } from "@/features/car-details/types";

export const compareService = {
  async getCarForCompare(id: string): Promise<CarDetails> {
    const response = await apiClient.get<CarDetails>(`/cars/${id}`);
    const data = response.data as any;
    return data.data ? data.data : data;
  }
};
