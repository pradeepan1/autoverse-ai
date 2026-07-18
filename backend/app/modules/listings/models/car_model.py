from typing import Optional
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base, CoreModelMixin


class CarModel(Base, CoreModelMixin):
    __tablename__ = "car_models"

    brand_id: Mapped[str] = mapped_column(String(36), ForeignKey("brands.id", ondelete="CASCADE"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    body_style: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    production_start_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    production_end_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    brand = relationship("Brand", backref="models")
