from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.core.repository import CRUDBase
from app.modules.rentals.models.rental import Rental


class RentalCreate(BaseModel):
    car_id: str
    user_id: str
    start_date: datetime
    end_date: datetime
    status: Optional[str] = "pending"
    total_price: float
    deposit_amount: Optional[float] = None
    
    model_config = ConfigDict(from_attributes=True)


class RentalUpdate(BaseModel):
    status: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class RentalRepository(CRUDBase[Rental, RentalCreate, RentalUpdate]):
    pass


rental_repo = RentalRepository(Rental)
