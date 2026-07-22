export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export interface CarModelMinimal {
  id: string;
  name: string;
  body_style?: string;
  brand_id: string;
}

export interface BrandMinimal {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
}

export interface DealerMinimal {
  id: string;
}

export interface Car {
  id: string;
  model_id: string;
  dealer_id: string;
  year: number;
  mileage: number;
  price: number;
  vin: string;
  condition: string;
  fuel_type: string;
  transmission: string;
  exterior_color?: string;
  interior_color?: string;
  features?: Record<string, any>;
  images: CarImage[];
  car_model?: CarModelMinimal;
  brand?: BrandMinimal;
  dealer?: DealerMinimal;
}

export interface CarListResponse {
  items: Car[];
  total: number;
  skip: number;
  limit: number;
}
