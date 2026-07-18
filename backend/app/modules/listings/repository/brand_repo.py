from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.repository import CRUDBase
from app.modules.listings.models.brand import Brand
from pydantic import BaseModel

class BrandCreate(BaseModel):
    name: str
    slug: str
    logo_url: Optional[str] = None
    country: Optional[str] = None
    established_year: Optional[int] = None

class BrandUpdate(BaseModel):
    name: Optional[str] = None
    logo_url: Optional[str] = None

class BrandRepository(CRUDBase[Brand, BrandCreate, BrandUpdate]):
    def get_by_slug(self, db: Session, slug: str) -> Optional[Brand]:
        return db.scalars(
            select(Brand).where(Brand.slug == slug, Brand.is_deleted == False)
        ).first()

brand_repo = BrandRepository(Brand)
