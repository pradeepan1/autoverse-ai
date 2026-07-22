"""
AutoVerse AI — Backend Application Entry Point (Skeleton).

This file only bootstraps the FastAPI application instance and wires up
configuration. Per project scope, no routers/endpoints, business logic,
or database tables are included at this stage — those are added in
subsequent development phases within this same structure, per
docs/PROJECT_RULES.md.
"""

from fastapi import FastAPI

from app.core.config import get_settings
import app.db.base  # noqa: F401

from app.api.v1 import api_router

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

# Register v1 router prefixing with /api/v1
app.include_router(api_router, prefix="/api/v1")

