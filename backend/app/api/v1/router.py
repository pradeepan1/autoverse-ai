from fastapi import APIRouter

from app.modules.auth.routes.auth import router as auth_router
from app.modules.listings.api.v1.brands import router as brands_router
from app.modules.listings.api.v1.categories import router as categories_router
from app.modules.listings.api.v1.cars import router as cars_router
from app.modules.dealers.api.v1.dealers import router as dealers_router

api_router = APIRouter()

# Register routes
api_router.include_router(auth_router)
api_router.include_router(brands_router, prefix="/brands", tags=["brands"])
api_router.include_router(categories_router, prefix="/categories", tags=["categories"])
api_router.include_router(cars_router, prefix="/cars", tags=["cars"])
api_router.include_router(dealers_router, prefix="/dealers", tags=["dealers"])
