from typing import Optional
from sqlalchemy import String, Integer, Float, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, CoreModelMixin


class Review(Base, CoreModelMixin):
    __tablename__ = "reviews"

    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    dealer_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("dealers.id", ondelete="CASCADE"), nullable=True, index=True)
    car_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("cars.id", ondelete="CASCADE"), nullable=True, index=True)
    
    rating: Mapped[float] = mapped_column(Float, nullable=False)
    comment: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    user = relationship("User")
    dealer = relationship("Dealer", backref="reviews")
    car = relationship("Car", backref="reviews")
