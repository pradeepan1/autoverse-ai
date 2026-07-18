from sqlalchemy import String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, CoreModelMixin


class CarImage(Base, CoreModelMixin):
    __tablename__ = "car_images"

    car_id: Mapped[str] = mapped_column(String(36), ForeignKey("cars.id", ondelete="CASCADE"), nullable=False, index=True)
    image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    display_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
