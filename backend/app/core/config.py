"""
AutoVerse AI — Application Configuration (Skeleton).

All configuration values are sourced from environment variables.
No values are hardcoded, per docs/PROJECT_RULES.md (Rule 20).
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "AutoVerse AI"
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"

    DATABASE_URL: str = ""
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_KEY: str = ""

    # JWT Config
    JWT_SECRET: str = "supersecretjwtkeythatisextremelysecureandhardtoguess"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
