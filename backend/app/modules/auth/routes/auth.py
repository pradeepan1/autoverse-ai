from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError

from app.modules.auth.routes.dependencies import get_db, get_current_user
from app.modules.auth.schemas.auth import (
    UserRegister,
    UserLogin,
    UserResponse,
    TokenRefresh,
    ForgotPassword,
    ResetPassword
)
from app.modules.auth.services.auth import AuthService
from app.modules.auth.services.jwt import create_access_token, create_refresh_token, verify_token
from app.modules.auth.repository.user import UserRepository

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=dict)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    db_user = AuthService.register_user(db, user_in)

    # Generate tokens
    access_token = create_access_token({"sub": db_user.id, "email": db_user.email, "role": db_user.role})
    refresh_token = create_refresh_token({"sub": db_user.id})

    user_resp = UserResponse.model_validate(db_user)

    return {
        "success": True,
        "data": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": user_resp.model_dump()
        },
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


@router.post("/login", response_model=dict)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    user = AuthService.authenticate_user(db, login_in.email, login_in.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.id})

    user_resp = UserResponse.model_validate(user)

    return {
        "success": True,
        "data": {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": user_resp.model_dump()
        },
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


@router.post("/refresh", response_model=dict)
def refresh(refresh_in: TokenRefresh, db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token"
    )
    try:
        payload = verify_token(refresh_in.refresh_token)
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if user_id is None or token_type != "refresh":
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = UserRepository.get_by_id(db, user_id)
    if user is None:
        raise credentials_exception

    # Generate new tokens (Rotation)
    new_access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    new_refresh_token = create_refresh_token({"sub": user.id})

    user_resp = UserResponse.model_validate(user)

    return {
        "success": True,
        "data": {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "user": user_resp.model_dump()
        },
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


@router.post("/logout", response_model=dict)
def logout(current_user=Depends(get_current_user)):
    return {
        "success": True,
        "data": {"message": "Successfully logged out"},
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


@router.get("/me", response_model=dict)
def me(current_user=Depends(get_current_user)):
    user_resp = UserResponse.model_validate(current_user)
    return {
        "success": True,
        "data": user_resp.model_dump(),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


@router.post("/forgot-password", response_model=dict)
def forgot_password(forgot_in: ForgotPassword):
    # Stub placeholder
    return {
        "success": True,
        "data": {"message": "Password reset instructions sent if email exists"},
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


@router.post("/reset-password", response_model=dict)
def reset_password(reset_in: ResetPassword):
    # Stub placeholder
    return {
        "success": True,
        "data": {"message": "Password has been reset successfully"},
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
