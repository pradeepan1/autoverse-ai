from app.core.service import BaseService
from app.modules.dealers.repository.dealer_repo import dealer_repo

class DealerService(BaseService):
    def __init__(self):
        super().__init__(repository=dealer_repo)

dealer_service = DealerService()
