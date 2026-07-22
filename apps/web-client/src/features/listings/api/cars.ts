import { apiClient } from '@/lib/api/client';
import { Car, CarListResponse } from '../types/car';

export async function getCars(params?: Record<string, string | number>): Promise<CarListResponse> {
  const urlParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.append(key, String(value));
      }
    });
  }

  const queryString = urlParams.toString();
  const url = queryString ? `/cars?${queryString}` : '/cars';

  const response = await apiClient.get<CarListResponse>(url);
  return response.data;
}

export async function getCar(id: string): Promise<Car> {
  const response = await apiClient.get<Car>(`/cars/${id}`);
  return response.data;
}
