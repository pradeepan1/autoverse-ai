from app.core.service import BaseService
from app.modules.rentals.repository.rental_repo import rental_repo

class RentalService(BaseService):
    def __init__(self):
        super().__init__(repository=rental_repo)

rental_service = RentalService()
