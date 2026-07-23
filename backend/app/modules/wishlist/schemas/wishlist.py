from pydantic import BaseModel, ConfigDict

class WishlistBase(BaseModel):
    car_id: str

class WishlistCreate(WishlistBase):
    pass

class WishlistUpdate(BaseModel):
    pass

class WishlistResponse(WishlistBase):
    id: str
    user_id: str

    model_config = ConfigDict(from_attributes=True)
