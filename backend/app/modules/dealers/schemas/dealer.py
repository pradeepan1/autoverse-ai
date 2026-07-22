from typing import Optional
from pydantic import BaseModel, ConfigDict

class DealerBase(BaseModel):
    user_id: str
    name: str
    slug: str
    description: Optional[str] = None
    address: str
    city: str
    state: str
    zip_code: str
    contact_email: str
    contact_phone: str

class DealerCreate(DealerBase):
    pass

class DealerUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    contact_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None

class DealerResponse(DealerBase):
    id: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    rating: Optional[float] = None
    total_reviews: int = 0

    model_config = ConfigDict(from_attributes=True)
