from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.wishlist.service.wishlist_service import wishlist_service
from app.modules.wishlist.schemas.wishlist import WishlistCreate, WishlistUpdate, WishlistResponse

router = APIRouter()

@router.get("/", response_model=list[WishlistResponse])
def get_wishlists(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> Any:
    return wishlist_service.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=WishlistResponse)
def get_wishlist(id: str, db: Session = Depends(get_db)) -> Any:
    return wishlist_service.get(db, id=id)

@router.post("/", response_model=WishlistResponse, status_code=201)
def create_wishlist(wishlist_in: WishlistCreate, db: Session = Depends(get_db)) -> Any:
    return wishlist_service.create(db, obj_in=wishlist_in)

@router.put("/{id}", response_model=WishlistResponse)
def update_wishlist(id: str, wishlist_in: WishlistUpdate, db: Session = Depends(get_db)) -> Any:
    return wishlist_service.update(db, id=id, obj_in=wishlist_in)

@router.delete("/{id}", response_model=WishlistResponse)
def delete_wishlist(id: str, db: Session = Depends(get_db)) -> Any:
    return wishlist_service.remove(db, id=id)
