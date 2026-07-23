import { apiClient } from "@/lib/api/client";
import { CarDetails, CarListResponse } from "../types";

export const carDetailsService = {
  async getCarById(id: string): Promise<CarDetails> {
    const response = await apiClient.get<CarDetails>(`/cars/${id}`);
    // Extract from ApiResponse envelope if needed, but existing client might do it via interceptor or we just access data
    // Usually apiClient returns the Axios response, and .data has the ApiResponse structure
    // Let's assume standard axios structure where response.data is the payload.
    // Wait, let's look at the AuthProvider, it does: response.data.data. 
    // Wait, the FastAPI route returns CarResponse directly or wrapped?
    // FastAPI routes: `return car_service.get(...)`. It's not wrapped in a JSON envelope by FastAPI unless there's global middleware.
    // Let's check how AuthProvider does it. `response.data.data`.
    // We'll safely check for wrapper.
    const data = response.data as any;
    return data.data ? data.data : data;
  },

  async getRelatedCars(brandSlug?: string, minPrice?: number, maxPrice?: number): Promise<CarDetails[]> {
    const params = new URLSearchParams();
    if (brandSlug) params.append("brand_slug", brandSlug);
    if (minPrice) params.append("min_price", minPrice.toString());
    if (maxPrice) params.append("max_price", maxPrice.toString());
    params.append("limit", "4");

    const response = await apiClient.get<CarListResponse>(`/cars/?${params.toString()}`);
    const data = response.data as any;
    const list = data.data ? data.data : data;
    return list.items || [];
  }
};
