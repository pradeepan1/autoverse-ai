from app.core.service import BaseService
from app.modules.listings.repository.brand_repo import brand_repo
from app.modules.listings.repository.category_repo import category_repo
from app.modules.listings.repository.car_repo import car_repo

class BrandService(BaseService):
    def __init__(self):
        super().__init__(repository=brand_repo)

class CategoryService(BaseService):
    def __init__(self):
        super().__init__(repository=category_repo)

class CarService(BaseService):
    def __init__(self):
        super().__init__(repository=car_repo)

brand_service = BrandService()
category_service = CategoryService()
car_service = CarService()
