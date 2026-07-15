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

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

# NOTE: API routers are intentionally not registered here yet.
# Future routers will be included via app.api.v1, one per module
# under app/modules/*, following the existing modular architecture.
