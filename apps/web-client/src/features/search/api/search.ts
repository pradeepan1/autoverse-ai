import { apiClient } from '@/lib/api/client';
import { SearchResponse, SuggestionResponse, PopularSearchResponse, SearchFilters } from '../types/search';

export async function searchCars(filters: SearchFilters): Promise<SearchResponse> {
  // Convert filters to query string, removing undefined/null values
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  const url = queryString ? `/search?${queryString}` : '/search';
  
  return apiClient.get<SearchResponse>(url);
}

export async function getSearchSuggestions(query: string, limit: number = 5): Promise<SuggestionResponse> {
  return apiClient.get<SuggestionResponse>(`/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`);
}

export async function getPopularSearches(limit: number = 5): Promise<PopularSearchResponse> {
  return apiClient.get<PopularSearchResponse>(`/search/popular?limit=${limit}`);
}
