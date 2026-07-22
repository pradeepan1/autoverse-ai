from app.core.service import BaseService
from app.modules.wishlist.repository.wishlist_repo import wishlist_repo

class WishlistService(BaseService):
    def __init__(self):
        super().__init__(repository=wishlist_repo)

wishlist_service = WishlistService()
