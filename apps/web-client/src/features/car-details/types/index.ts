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
  body_style: string | null;
  brand_id: string;
}

export interface BrandMinimal {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
}

export interface DealerMinimal {
  id: string;
  // Fallbacks in UI
}

export interface CarFeatures {
  engine?: string;
  horsepower?: string;
  torque?: string;
  drive_type?: string;
  doors?: number;
  seats?: number;
  fuel_tank_capacity?: string;
  safety?: string[];
  comfort?: string[];
  entertainment?: string[];
  description?: string;
  highlights?: string[];
  owner_count?: number;
  service_history?: string;
  inspection_status?: string;
  [key: string]: any;
}

export interface CarDetails {
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
  exterior_color: string | null;
  interior_color: string | null;
  features: CarFeatures | null;
  images: CarImage[];
  car_model: CarModelMinimal | null;
  brand: BrandMinimal | null;
  dealer: DealerMinimal | null;
}

export interface CarListResponse {
  items: CarDetails[];
  total: number;
  skip: number;
  limit: number;
}
