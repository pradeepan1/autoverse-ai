from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.rentals.service.rental_service import rental_service
from app.modules.rentals.schemas.rental import RentalCreate, RentalUpdate, RentalResponse

router = APIRouter()

@router.get("/", response_model=list[RentalResponse])
def get_rentals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return rental_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=RentalResponse)
def get_rental(id: str, db: Session = Depends(get_db)) -> Any:
    return rental_service.get(db, id=id)

@router.post("/", response_model=RentalResponse, status_code=201)
def create_rental(rental_in: RentalCreate, db: Session = Depends(get_db)) -> Any:
    return rental_service.create(db, obj_in=rental_in)

@router.put("/{id}", response_model=RentalResponse)
def update_rental(id: str, rental_in: RentalUpdate, db: Session = Depends(get_db)) -> Any:
    return rental_service.update(db, id=id, obj_in=rental_in)

@router.delete("/{id}", response_model=RentalResponse)
def delete_rental(id: str, db: Session = Depends(get_db)) -> Any:
    return rental_service.remove(db, id=id)
