from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, CoreModelMixin


class Wishlist(Base, CoreModelMixin):
    __tablename__ = "wishlists"

    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    car_id: Mapped[str] = mapped_column(String(36), ForeignKey("cars.id", ondelete="CASCADE"), nullable=False, index=True)

    user = relationship("User", backref="wishlist_items")
    car = relationship("Car")
