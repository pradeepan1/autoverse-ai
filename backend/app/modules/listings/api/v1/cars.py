from typing import Any, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.listings.service.listings_service import car_service
from app.modules.listings.repository.car_repo import CarCreate, CarUpdate

router = APIRouter()

@router.get("/")
def get_cars(
    skip: int = 0, 
    limit: int = 100,
    dealer_id: Optional[str] = None,
    condition: Optional[str] = None,
    fuel_type: Optional[str] = None,
    db: Session = Depends(get_db)
) -> Any:
    filters = {}
    if dealer_id: filters["dealer_id"] = dealer_id
    if condition: filters["condition"] = condition
    if fuel_type: filters["fuel_type"] = fuel_type
    
    return car_service.get_multi(db, skip=skip, limit=limit, filters=filters)

@router.get("/{id}")
def get_car(id: str, db: Session = Depends(get_db)) -> Any:
    return car_service.get(db, id=id)

@router.post("/")
def create_car(car_in: CarCreate, db: Session = Depends(get_db)) -> Any:
    return car_service.create(db, obj_in=car_in)

@router.put("/{id}")
def update_car(id: str, car_in: CarUpdate, db: Session = Depends(get_db)) -> Any:
    return car_service.update(db, id=id, obj_in=car_in)

@router.delete("/{id}")
def delete_car(id: str, db: Session = Depends(get_db)) -> Any:
    return car_service.remove(db, id=id)
