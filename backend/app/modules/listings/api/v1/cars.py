from typing import Any, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.listings.service.listings_service import car_service
from app.modules.listings.schemas.car import (
    CarCreate, 
    CarUpdate, 
    CarResponse, 
    CarListResponse
)

router = APIRouter()

@router.get("/", response_model=CarListResponse)
def get_cars(
    skip: int = Query(0, ge=0), 
    limit: int = Query(100, ge=1, le=100),
    dealer_id: Optional[str] = None,
    condition: Optional[str] = None,
    fuel_type: Optional[str] = None,
    transmission: Optional[str] = None,
    year: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    body_style: Optional[str] = None,
    brand_slug: Optional[str] = None,
    db: Session = Depends(get_db)
) -> Any:
    filters = {}
    if dealer_id: filters["dealer_id"] = dealer_id
    if condition: filters["condition"] = condition
    if fuel_type: filters["fuel_type"] = fuel_type
    if transmission: filters["transmission"] = transmission
    if year: filters["year"] = year
    if min_price is not None: filters["min_price"] = min_price
    if max_price is not None: filters["max_price"] = max_price
    if body_style: filters["body_style"] = body_style
    if brand_slug: filters["brand_slug"] = brand_slug
    
    items = car_service.get_multi(db, skip=skip, limit=limit, filters=filters)
    total = car_service.count(db, filters=filters)
    
    return {
        "items": items,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/{id}", response_model=CarResponse)
def get_car(id: str, db: Session = Depends(get_db)) -> Any:
    return car_service.get(db, id=id)

@router.post("/", response_model=CarResponse, status_code=201)
def create_car(car_in: CarCreate, db: Session = Depends(get_db)) -> Any:
    return car_service.create(db, obj_in=car_in)

@router.put("/{id}", response_model=CarResponse)
def update_car(id: str, car_in: CarUpdate, db: Session = Depends(get_db)) -> Any:
    return car_service.update(db, id=id, obj_in=car_in)

@router.delete("/{id}", response_model=CarResponse)
def delete_car(id: str, db: Session = Depends(get_db)) -> Any:
    return car_service.remove(db, id=id)
