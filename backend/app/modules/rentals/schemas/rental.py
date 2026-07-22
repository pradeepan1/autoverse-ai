from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class RentalBase(BaseModel):
    car_id: str
    user_id: str
    start_date: datetime
    end_date: datetime
    total_price: float
    deposit_amount: Optional[float] = None

class RentalCreate(RentalBase):
    pass

class RentalUpdate(BaseModel):
    status: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    total_price: Optional[float] = None
    deposit_amount: Optional[float] = None

class RentalResponse(RentalBase):
    id: str
    status: str

    model_config = ConfigDict(from_attributes=True)
