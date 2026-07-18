from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, CoreModelMixin


class Rental(Base, CoreModelMixin):
    __tablename__ = "rentals"

    car_id: Mapped[str] = mapped_column(String(36), ForeignKey("cars.id", ondelete="RESTRICT"), nullable=False, index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="pending") # pending, active, completed, cancelled
    
    total_price: Mapped[float] = mapped_column(Float, nullable=False)
    deposit_amount: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    car = relationship("Car")
    user = relationship("User")
