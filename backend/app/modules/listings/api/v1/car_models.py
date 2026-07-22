from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.listings.service.listings_service import car_model_service
from app.modules.listings.schemas.car_model import CarModelCreate, CarModelUpdate, CarModelResponse

router = APIRouter()

@router.get("/", response_model=List[CarModelResponse])
def get_car_models(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return car_model_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=CarModelResponse)
def get_car_model(id: str, db: Session = Depends(get_db)) -> Any:
    return car_model_service.get(db, id=id)

@router.post("/", response_model=CarModelResponse, status_code=201)
def create_car_model(car_model_in: CarModelCreate, db: Session = Depends(get_db)) -> Any:
    return car_model_service.create(db, obj_in=car_model_in)

@router.put("/{id}", response_model=CarModelResponse)
def update_car_model(id: str, car_model_in: CarModelUpdate, db: Session = Depends(get_db)) -> Any:
    return car_model_service.update(db, id=id, obj_in=car_model_in)

@router.delete("/{id}", response_model=CarModelResponse)
def delete_car_model(id: str, db: Session = Depends(get_db)) -> Any:
    return car_model_service.remove(db, id=id)
