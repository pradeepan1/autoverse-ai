"""
AutoVerse AI — Database Session Skeleton.

Establishes the SQLAlchemy engine/session pattern for PostgreSQL.
No tables, queries, or repository logic are included at this stage.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings

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
