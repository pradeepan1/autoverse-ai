import { Car, CarListResponse } from '../types/car';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function getCars(params?: Record<string, string | number>): Promise<CarListResponse> {
  const url = new URL(`${API_URL}/cars`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }

  return response.json();
}

export async function getCar(id: string): Promise<Car> {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Car not found');
    }
    throw new Error('Failed to fetch car details');
  }

  return response.json();
}
