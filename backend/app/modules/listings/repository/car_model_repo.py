from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.repository import CRUDBase
from app.modules.listings.models.car_model import CarModel
from app.modules.listings.schemas.car_model import CarModelCreate, CarModelUpdate

class CarModelRepository(CRUDBase[CarModel, CarModelCreate, CarModelUpdate]):
    def get_by_slug(self, db: Session, slug: str) -> Optional[CarModel]:
        return db.scalars(
            select(CarModel).where(CarModel.slug == slug, CarModel.is_deleted == False)
        ).first()

car_model_repo = CarModelRepository(CarModel)
