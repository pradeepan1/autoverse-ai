from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.repository import CRUDBase
from app.modules.listings.models.category import Category
from pydantic import BaseModel

class CategoryCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class CategoryRepository(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def get_by_slug(self, db: Session, slug: str) -> Optional[Category]:
        return db.scalars(
            select(Category).where(Category.slug == slug, Category.is_deleted == False)
        ).first()

category_repo = CategoryRepository(Category)
