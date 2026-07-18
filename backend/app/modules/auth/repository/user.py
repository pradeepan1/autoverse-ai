from typing import Optional
from sqlalchemy.orm import Session

from app.modules.auth.models.user import User
from app.modules.auth.schemas.auth import UserRegister


class UserRepository:
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_id(db: Session, user_id: str) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create(db: Session, user_in: UserRegister, password_hash: str) -> User:
        db_user = User(
            email=user_in.email.strip().lower(),
            full_name=user_in.full_name.strip(),
            password_hash=password_hash,
            role=user_in.role.strip().lower(),
            phone=user_in.phone.strip() if user_in.phone else None,
            avatar_url=user_in.avatar_url.strip() if user_in.avatar_url else None,
            is_verified=False
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
