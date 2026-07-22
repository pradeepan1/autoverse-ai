from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.reviews.service.review_service import review_service
from app.modules.reviews.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse

router = APIRouter()

@router.get("/", response_model=list[ReviewResponse])
def get_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return review_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=ReviewResponse)
def get_review(id: str, db: Session = Depends(get_db)) -> Any:
    return review_service.get(db, id=id)

@router.post("/", response_model=ReviewResponse, status_code=201)
def create_review(review_in: ReviewCreate, db: Session = Depends(get_db)) -> Any:
    return review_service.create(db, obj_in=review_in)

@router.put("/{id}", response_model=ReviewResponse)
def update_review(id: str, review_in: ReviewUpdate, db: Session = Depends(get_db)) -> Any:
    return review_service.update(db, id=id, obj_in=review_in)

@router.delete("/{id}", response_model=ReviewResponse)
def delete_review(id: str, db: Session = Depends(get_db)) -> Any:
    return review_service.remove(db, id=id)
