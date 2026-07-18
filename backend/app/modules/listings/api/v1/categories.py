from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.listings.service.listings_service import category_service
from app.modules.listings.repository.category_repo import CategoryCreate, CategoryUpdate

router = APIRouter()

@router.get("/")
def get_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return category_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}")
def get_category(id: str, db: Session = Depends(get_db)) -> Any:
    return category_service.get(db, id=id)

@router.post("/")
def create_category(category_in: CategoryCreate, db: Session = Depends(get_db)) -> Any:
    return category_service.create(db, obj_in=category_in)

@router.put("/{id}")
def update_category(id: str, category_in: CategoryUpdate, db: Session = Depends(get_db)) -> Any:
    return category_service.update(db, id=id, obj_in=category_in)

@router.delete("/{id}")
def delete_category(id: str, db: Session = Depends(get_db)) -> Any:
    return category_service.remove(db, id=id)
