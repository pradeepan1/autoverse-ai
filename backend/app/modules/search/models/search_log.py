from typing import Optional
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base, CoreModelMixin


class SearchLog(Base, CoreModelMixin):
    __tablename__ = "search_logs"

    query: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    user_id: Mapped[Optional[str]] = mapped_column(String(36), nullable=True, index=True)
    count: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
