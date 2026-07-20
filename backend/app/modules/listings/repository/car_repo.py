from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session, selectinload, joinedload
from sqlalchemy import select, func, and_
from app.core.repository import CRUDBase
from app.modules.listings.models.car import Car
from app.modules.listings.models.car_model import CarModel
from app.modules.listings.models.brand import Brand
from app.modules.listings.schemas.car import CarCreate, CarUpdate

class CarRepository(CRUDBase[Car, CarCreate, CarUpdate]):
    def get_by_vin(self, db: Session, vin: str) -> Optional[Car]:
        return db.scalars(
            select(Car).where(Car.vin == vin, Car.is_deleted == False)
        ).first()

    def get(self, db: Session, id: Any) -> Optional[Car]:
        return db.scalars(
            select(Car)
            .options(selectinload(Car.images), selectinload(Car.car_model).selectinload(CarModel.brand))
            .where(Car.id == id, Car.is_deleted == False)
        ).first()

    def _apply_filters(self, query, filters: Dict[str, Any]):
        if filters:
            if "dealer_id" in filters and filters["dealer_id"]:
                query = query.where(Car.dealer_id == filters["dealer_id"])
            if "condition" in filters and filters["condition"]:
                query = query.where(Car.condition == filters["condition"])
            if "fuel_type" in filters and filters["fuel_type"]:
                query = query.where(Car.fuel_type == filters["fuel_type"])
            if "transmission" in filters and filters["transmission"]:
                query = query.where(Car.transmission == filters["transmission"])
            if "year" in filters and filters["year"]:
                query = query.where(Car.year == filters["year"])
            if "min_price" in filters and filters["min_price"] is not None:
                query = query.where(Car.price >= filters["min_price"])
            if "max_price" in filters and filters["max_price"] is not None:
                query = query.where(Car.price <= filters["max_price"])
            
            # Requires joins for brand and body_style
            needs_model_join = False
            needs_brand_join = False
            
            if "body_style" in filters and filters["body_style"]:
                needs_model_join = True
                query = query.where(CarModel.body_style == filters["body_style"])
            if "brand_slug" in filters and filters["brand_slug"]:
                needs_model_join = True
                needs_brand_join = True
                query = query.where(Brand.slug == filters["brand_slug"])
                
            if needs_model_join:
                query = query.join(CarModel, Car.model_id == CarModel.id)
            if needs_brand_join:
                query = query.join(Brand, CarModel.brand_id == Brand.id)
                
        return query

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100, filters: dict = None
    ) -> List[Car]:
        query = select(Car).where(Car.is_deleted == False)
        
        query = self._apply_filters(query, filters)
        
        # Load relationships for response
        query = query.options(
            selectinload(Car.images), 
            selectinload(Car.car_model).selectinload(CarModel.brand)
        )
        
        # Sorting (default by newest)
        query = query.order_by(Car.created_at.desc())
        
        query = query.offset(skip).limit(limit)
        return list(db.scalars(query).all())

    def count(self, db: Session, *, filters: dict = None) -> int:
        query = select(func.count(Car.id)).where(Car.is_deleted == False)
        query = self._apply_filters(query, filters)
        return db.scalar(query) or 0

car_repo = CarRepository(Car)
