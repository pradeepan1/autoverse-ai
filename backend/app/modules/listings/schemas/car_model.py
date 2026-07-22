from typing import Optional
from pydantic import BaseModel, ConfigDict

class CarModelBase(BaseModel):
    brand_id: str
    name: str
    slug: str
    body_style: Optional[str] = None
    production_start_year: Optional[int] = None
    production_end_year: Optional[int] = None

class CarModelCreate(CarModelBase):
    pass

class CarModelUpdate(BaseModel):
    brand_id: Optional[str] = None
    name: Optional[str] = None
    slug: Optional[str] = None
    body_style: Optional[str] = None
    production_start_year: Optional[int] = None
    production_end_year: Optional[int] = None

class CarModelResponse(CarModelBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
