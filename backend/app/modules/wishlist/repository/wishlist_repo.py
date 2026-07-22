from pydantic import BaseModel, ConfigDict
from app.core.repository import CRUDBase
from app.modules.wishlist.models.wishlist import Wishlist


class WishlistCreate(BaseModel):
    user_id: str
    car_id: str
    
    model_config = ConfigDict(from_attributes=True)


class WishlistUpdate(BaseModel):
    pass
    
    model_config = ConfigDict(from_attributes=True)


class WishlistRepository(CRUDBase[Wishlist, WishlistCreate, WishlistUpdate]):
    pass


wishlist_repo = WishlistRepository(Wishlist)
