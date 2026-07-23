from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.modules.auth.routes.dependencies import get_current_user
from app.modules.wishlist.service.wishlist_service import wishlist_service
from app.modules.wishlist.schemas.wishlist import WishlistCreate, WishlistUpdate, WishlistResponse

router = APIRouter()

@router.get("/", response_model=list[WishlistResponse])
def get_wishlists(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_user)) -> Any:
    return wishlist_service.get_multi(db, skip=skip, limit=limit, filters={"user_id": current_user.id})

@router.get("/{id}", response_model=WishlistResponse)
def get_wishlist(id: str, db: Session = Depends(get_db), current_user = Depends(get_current_user)) -> Any:
    wishlist = wishlist_service.get(db, id=id)
    if wishlist.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this wishlist")
    return wishlist

@router.post("/", response_model=WishlistResponse, status_code=201)
def create_wishlist(wishlist_in: WishlistCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)) -> Any:
    create_data = wishlist_in.model_dump()
    create_data["user_id"] = current_user.id
    return wishlist_service.create(db, obj_in=create_data)

@router.delete("/{id}", response_model=WishlistResponse)
def delete_wishlist(id: str, db: Session = Depends(get_db), current_user = Depends(get_current_user)) -> Any:
    wishlist = wishlist_service.get(db, id=id)
    if wishlist.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this wishlist")
    return wishlist_service.remove(db, id=id)
