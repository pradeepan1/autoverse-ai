"""
AutoVerse AI — Database Session Skeleton.

Establishes the SQLAlchemy engine/session pattern for PostgreSQL.
No tables, queries, or repository logic are included at this stage.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings

settings = get_settings()

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True) if settings.DATABASE_URL else None

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) if engine else None
