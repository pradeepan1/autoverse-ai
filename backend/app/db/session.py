"""
AutoVerse AI — Database Session Skeleton.

Establishes the SQLAlchemy engine/session pattern for PostgreSQL.
No tables, queries, or repository logic are included at this stage.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings
import app.db.base  # noqa: F401

settings = get_settings()

if settings.DATABASE_URL:
    engine_args = {"pool_pre_ping": True}
    if settings.DATABASE_URL.startswith("postgresql"):
        engine_args["pool_size"] = 10
        engine_args["max_overflow"] = 20
        
    engine = create_engine(
        settings.DATABASE_URL,
        **engine_args
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
else:
    engine = None
    SessionLocal = None
from typing import Generator
from sqlalchemy.orm import Session


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a SQLAlchemy database session.
    """
    if SessionLocal is None:
        raise RuntimeError("Database is not configured. Set DATABASE_URL.")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()