from typing import Optional
from pydantic import BaseModel, ConfigDict

class BrandBase(BaseModel):
    name: str
    slug: str
    logo_url: Optional[str] = None
    country: Optional[str] = None
    established_year: Optional[int] = None

class BrandCreate(BrandBase):
    pass

class BrandUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    logo_url: Optional[str] = None
    country: Optional[str] = None
    established_year: Optional[int] = None

class BrandResponse(BrandBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
