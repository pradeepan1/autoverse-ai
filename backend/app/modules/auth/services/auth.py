from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.modules.auth.repository.user import UserRepository
from app.modules.auth.models.user import User
from app.modules.auth.schemas.auth import UserRegister
from app.modules.auth.services.hash import PasswordHasher


class AuthService:
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        user = UserRepository.get_by_email(db, email.strip().lower())
        if not user:
            return None
        if not PasswordHasher.verify_password(password, user.password_hash):
            return None
        return user

    @staticmethod
    def register_user(db: Session, user_in: UserRegister) -> User:
        email_clean = user_in.email.strip().lower()
        existing_user = UserRepository.get_by_email(db, email_clean)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )
        hashed_password = PasswordHasher.hash_password(user_in.password)
        # Validate and standardise roles
        role_clean = user_in.role.strip().lower()
        allowed_roles = {"buyer", "dealer", "admin", "support_agent", "super_admin"}
        # Map frontend "support" to database "support_agent"
        if role_clean == "support":
            user_in.role = "support_agent"
        elif role_clean not in allowed_roles:
            user_in.role = "buyer"
        else:
            user_in.role = role_clean
        return UserRepository.create(db, user_in, hashed_password)
