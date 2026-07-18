from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class UserBase(BaseModel):
    email: str = Field(..., pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
    full_name: str = Field(..., max_length=150)
    phone: Optional[str] = Field(default=None, pattern=r"^\+?[1-9]\d{6,14}$")
    avatar_url: Optional[str] = None


class UserRegister(UserBase):
    password: str = Field(..., min_length=8)
    role: str = Field(default="buyer")


class UserLogin(BaseModel):
    email: str = Field(..., pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
    password: str


class UserResponse(UserBase):
    id: str
    role: str
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    user_id: str
    email: str
    role: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: UserResponse


class TokenRefresh(BaseModel):
    refresh_token: str


class ForgotPassword(BaseModel):
    email: str = Field(..., pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class ResetPassword(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)


# envelope schemas for API documentation
class SuccessResponse(BaseModel):
    success: bool = True
    data: dict
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ErrorResponseDetail(BaseModel):
    code: str
    message: str
    field: Optional[str] = None
    details: Optional[dict] = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorResponseDetail
    timestamp: datetime = Field(default_factory=datetime.utcnow)
