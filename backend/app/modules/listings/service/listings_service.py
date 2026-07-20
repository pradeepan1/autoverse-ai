from typing import Any, Dict, Union
from sqlalchemy.orm import Session
from app.core.service import BaseService
from app.modules.listings.repository.brand_repo import brand_repo
from app.modules.listings.repository.category_repo import category_repo
from app.modules.listings.repository.car_repo import car_repo
from app.modules.listings.models.car_image import CarImage

class BrandService(BaseService):
    def __init__(self):
        super().__init__(repository=brand_repo)

class CategoryService(BaseService):
    def __init__(self):
        super().__init__(repository=category_repo)

class CarService(BaseService):
    def __init__(self):
        super().__init__(repository=car_repo)

    def create(self, db: Session, obj_in: Any) -> Any:
        images_data = []
        if hasattr(obj_in, "images") and obj_in.images:
            images_data = obj_in.images
            # we don't pass images directly to the repo create if it doesn't handle relationships automatically easily
            # actually obj_in is Pydantic model CarCreate. We will pop it.
        
        obj_in_data = obj_in.model_dump(exclude={"images"})
        
        # Create car
        car = super().create(db, obj_in=obj_in_data)
        
        # Add images
        if images_data:
            for image_in in images_data:
                img_obj = CarImage(
                    car_id=car.id,
                    image_url=image_in.image_url,
                    is_primary=image_in.is_primary,
                    display_order=image_in.display_order
                )
                db.add(img_obj)
            db.commit()
            db.refresh(car)
            
        return car

    def update(self, db: Session, id: str, obj_in: Union[Any, Dict[str, Any]]) -> Any:
        # Just simple update for now, image updating can be handled separately or added later
        return super().update(db, id=id, obj_in=obj_in)

brand_service = BrandService()
category_service = CategoryService()
car_service = CarService()
