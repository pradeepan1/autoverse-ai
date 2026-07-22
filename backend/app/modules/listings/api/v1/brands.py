from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.listings.service.listings_service import brand_service
from app.modules.listings.schemas.brand import BrandCreate, BrandUpdate, BrandResponse

router = APIRouter()

@router.get("/", response_model=list[BrandResponse])
def get_brands(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return brand_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=BrandResponse)
def get_brand(id: str, db: Session = Depends(get_db)) -> Any:
    return brand_service.get(db, id=id)

@router.post("/", response_model=BrandResponse)
def create_brand(brand_in: BrandCreate, db: Session = Depends(get_db)) -> Any:
    return brand_service.create(db, obj_in=brand_in)

@router.put("/{id}", response_model=BrandResponse)
def update_brand(id: str, brand_in: BrandUpdate, db: Session = Depends(get_db)) -> Any:
    return brand_service.update(db, id=id, obj_in=brand_in)

@router.delete("/{id}", response_model=BrandResponse)
def delete_brand(id: str, db: Session = Depends(get_db)) -> Any:
    return brand_service.remove(db, id=id)
