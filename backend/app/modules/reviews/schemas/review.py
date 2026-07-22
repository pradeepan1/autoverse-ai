from typing import Optional
from pydantic import BaseModel, ConfigDict

class ReviewBase(BaseModel):
    user_id: str
    rating: float
    comment: Optional[str] = None
    dealer_id: Optional[str] = None
    car_id: Optional[str] = None

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    rating: Optional[float] = None
    comment: Optional[str] = None

class ReviewResponse(ReviewBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
