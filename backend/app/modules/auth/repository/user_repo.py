from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.repository import CRUDBase
from app.modules.auth.models.user import User
from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    email: str
    password_hash: str
    role: str = "buyer"

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    role: Optional[str] = None
    is_verified: Optional[bool] = None

class UserRepository(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, email: str) -> Optional[User]:
        return db.scalars(
            select(User).where(User.email == email, User.is_deleted == False)
        ).first()

user_repo = UserRepository(User)
