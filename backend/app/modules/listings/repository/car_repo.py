from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.repository import CRUDBase
from app.modules.listings.models.car import Car
from pydantic import BaseModel

class CarCreate(BaseModel):
    model_id: str
    dealer_id: str
    year: int
    mileage: int
    price: float
    vin: str
    condition: str
    fuel_type: str
    transmission: str
    exterior_color: Optional[str] = None
    interior_color: Optional[str] = None

class CarUpdate(BaseModel):
    price: Optional[float] = None
    mileage: Optional[int] = None
    condition: Optional[str] = None

class CarRepository(CRUDBase[Car, CarCreate, CarUpdate]):
    def get_by_vin(self, db: Session, vin: str) -> Optional[Car]:
        return db.scalars(
            select(Car).where(Car.vin == vin, Car.is_deleted == False)
        ).first()

car_repo = CarRepository(Car)
