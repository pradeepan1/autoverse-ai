from typing import Optional
from sqlalchemy import String, Integer, Float, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, CoreModelMixin


class Car(Base, CoreModelMixin):
    __tablename__ = "cars"

    model_id: Mapped[str] = mapped_column(String(36), ForeignKey("car_models.id", ondelete="RESTRICT"), nullable=False, index=True)
    dealer_id: Mapped[str] = mapped_column(String(36), ForeignKey("dealers.id", ondelete="CASCADE"), nullable=False, index=True)
    
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    mileage: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    vin: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    
    variant: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    seating_capacity: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    
    condition: Mapped[str] = mapped_column(String(50), nullable=False) # new, used, certified
    fuel_type: Mapped[str] = mapped_column(String(50), nullable=False)
    transmission: Mapped[str] = mapped_column(String(50), nullable=False)
    
    exterior_color: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    interior_color: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    features: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    car_model = relationship("CarModel")
    dealer = relationship("Dealer", backref="cars")
    images = relationship("CarImage", backref="car", cascade="all, delete-orphan")

    @property
    def brand(self):
        return self.car_model.brand if self.car_model else None
