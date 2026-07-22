from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.dealers.service.dealer_service import dealer_service
from app.modules.dealers.schemas.dealer import DealerCreate, DealerUpdate, DealerResponse

router = APIRouter()

@router.get("/", response_model=list[DealerResponse])
def get_dealers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return dealer_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=DealerResponse)
def get_dealer(id: str, db: Session = Depends(get_db)) -> Any:
    return dealer_service.get(db, id=id)

@router.post("/", response_model=DealerResponse, status_code=201)
def create_dealer(dealer_in: DealerCreate, db: Session = Depends(get_db)) -> Any:
    return dealer_service.create(db, obj_in=dealer_in)

@router.put("/{id}", response_model=DealerResponse)
def update_dealer(id: str, dealer_in: DealerUpdate, db: Session = Depends(get_db)) -> Any:
    return dealer_service.update(db, id=id, obj_in=dealer_in)

@router.delete("/{id}", response_model=DealerResponse)
def delete_dealer(id: str, db: Session = Depends(get_db)) -> Any:
    return dealer_service.remove(db, id=id)
