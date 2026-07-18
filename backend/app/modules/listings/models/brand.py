from typing import Optional
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, CoreModelMixin


class Brand(Base, CoreModelMixin):
    __tablename__ = "brands"

    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    slug: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    logo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    country: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    established_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
