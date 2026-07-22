from pydantic import BaseModel, ConfigDict

class WishlistBase(BaseModel):
    user_id: str
    car_id: str

class WishlistCreate(WishlistBase):
    pass

class WishlistUpdate(BaseModel):
    pass

class WishlistResponse(WishlistBase):
    id: str

    model_config = ConfigDict(from_attributes=True)
