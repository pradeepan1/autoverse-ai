import { Car } from '@/features/listings/types/car';

export interface SearchResponse {
  items: Car[];
  total: number;
  skip: number;
  limit: number;
}

export interface SuggestionResponse {
  suggestions: string[];
}

export interface PopularSearchResponse {
  queries: string[];
}

export interface SearchFilters {
  q?: string;
  brand?: string;
  model?: string;
  variant?: string;
  dealer?: string;
  fuel_type?: string;
  transmission?: string;
  body_style?: string;
  exterior_color?: string;
  seating_capacity?: number;
  min_price?: number;
  max_price?: number;
  min_mileage?: number;
  max_mileage?: number;
  min_year?: number;
  max_year?: number;
  location?: string;
  sort_by?: string;
  skip?: number;
  limit?: number;
}
