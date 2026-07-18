from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.dealers.service.dealer_service import dealer_service
from app.modules.dealers.repository.dealer_repo import DealerCreate, DealerUpdate

router = APIRouter()

@router.get("/")
def get_dealers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return dealer_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}")
def get_dealer(id: str, db: Session = Depends(get_db)) -> Any:
    return dealer_service.get(db, id=id)

@router.post("/")
def create_dealer(dealer_in: DealerCreate, db: Session = Depends(get_db)) -> Any:
    return dealer_service.create(db, obj_in=dealer_in)

@router.put("/{id}")
def update_dealer(id: str, dealer_in: DealerUpdate, db: Session = Depends(get_db)) -> Any:
    return dealer_service.update(db, id=id, obj_in=dealer_in)

@router.delete("/{id}")
def delete_dealer(id: str, db: Session = Depends(get_db)) -> Any:
    return dealer_service.remove(db, id=id)
