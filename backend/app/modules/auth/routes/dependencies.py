from typing import Generator, List
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.modules.auth.repository.user import UserRepository
from app.modules.auth.services.jwt import verify_token
from app.modules.auth.models.user import User

# OAuth2 scheme looking for token in the Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login", auto_error=False)


def get_db() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database session is not initialized."
        )
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="AUTHENTICATION_REQUIRED",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_expired_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="TOKEN_EXPIRED",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token:
        raise credentials_exception

    try:
        payload = verify_token(token)
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "access":
            raise credentials_exception
    except JWTError as e:
        if "signature has expired" in str(e).lower() or "expired" in str(e).lower():
            raise token_expired_exception
        raise credentials_exception

    user = UserRepository.get_by_id(db, user_id)
    if user is None:
        raise credentials_exception
    return user


class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        # Check database "support_agent" mapping to allowed "support" if necessary
        user_role = current_user.role
        mapped_allowed = list(self.allowed_roles)
        if "support" in mapped_allowed:
            mapped_allowed.append("support_agent")

        if user_role not in mapped_allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="PERMISSION_DENIED"
            )
        return current_user
