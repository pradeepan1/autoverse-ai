"""
AutoVerse AI — SQLAlchemy Declarative Base (Skeleton).

No table models are defined here. Per-module models live under
app/modules/<module>/models/ and will import Base from this file
once table definitions are introduced in a later development phase.
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
