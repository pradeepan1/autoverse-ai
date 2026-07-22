from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

class CarImageBase(BaseModel):
    image_url: str
    is_primary: bool = False
    display_order: int = 0

class CarImageCreate(CarImageBase):
    pass

class CarImageResponse(CarImageBase):
    id: str
    car_id: str

    model_config = ConfigDict(from_attributes=True)

class CarBase(BaseModel):
    year: int
    mileage: int
    price: float
    vin: str = Field(..., max_length=100)
    condition: str = Field(..., max_length=50)
    fuel_type: str = Field(..., max_length=50)
    transmission: str = Field(..., max_length=50)
    exterior_color: Optional[str] = Field(None, max_length=50)
    interior_color: Optional[str] = Field(None, max_length=50)
    features: Optional[Dict[str, Any]] = None

class CarCreate(CarBase):
    model_id: str
    dealer_id: str
    images: Optional[List[CarImageCreate]] = None

class CarUpdate(BaseModel):
    price: Optional[float] = None
    mileage: Optional[int] = None
    condition: Optional[str] = Field(None, max_length=50)
    features: Optional[Dict[str, Any]] = None
    # We could allow updating other fields if needed

class CarModelMinimal(BaseModel):
    id: str
    name: str
    body_style: Optional[str] = None
    brand_id: str

    model_config = ConfigDict(from_attributes=True)

class BrandMinimal(BaseModel):
    id: str
    name: str
    slug: str
    logo_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class DealerMinimal(BaseModel):
    id: str
    # In a full app this might have name, dealership_name, etc.

    model_config = ConfigDict(from_attributes=True)

class CarResponse(CarBase):
    id: str
    model_id: str
    dealer_id: str
    images: List[CarImageResponse] = []
    
    # Relationships for convenience in UI
    car_model: Optional[CarModelMinimal] = None
    brand: Optional[BrandMinimal] = None

    model_config = ConfigDict(from_attributes=True)

class CarListResponse(BaseModel):
    items: List[CarResponse]
    total: int
    skip: int
    limit: int
