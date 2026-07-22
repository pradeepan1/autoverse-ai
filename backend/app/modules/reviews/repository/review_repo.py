from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.core.repository import CRUDBase
from app.modules.reviews.models.review import Review


class ReviewCreate(BaseModel):
    user_id: str
    dealer_id: Optional[str] = None
    car_id: Optional[str] = None
    rating: float
    comment: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class ReviewUpdate(BaseModel):
    rating: Optional[float] = None
    comment: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class ReviewRepository(CRUDBase[Review, ReviewCreate, ReviewUpdate]):
    pass


review_repo = ReviewRepository(Review)
