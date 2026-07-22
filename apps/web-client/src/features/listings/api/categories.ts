import { apiClient } from '@/lib/api/client';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
}

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>('/categories/');
  return response.data;
}
