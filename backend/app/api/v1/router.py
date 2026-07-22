from fastapi import APIRouter

from app.modules.auth.routes.auth import router as auth_router
from app.modules.listings.api.v1.brands import router as brands_router
from app.modules.listings.api.v1.categories import router as categories_router
from app.modules.listings.api.v1.car_models import router as car_models_router
from app.modules.listings.api.v1.cars import router as cars_router
from app.modules.dealers.api.v1.dealers import router as dealers_router
from app.modules.search.routes.search import router as search_router
from app.modules.rentals.api.v1.rentals import router as rentals_router
from app.modules.reviews.api.v1.reviews import router as reviews_router
from app.modules.wishlist.api.v1.wishlists import router as wishlists_router

api_router = APIRouter()

# Register routes
api_router.include_router(auth_router)
api_router.include_router(brands_router, prefix="/brands", tags=["brands"])
api_router.include_router(categories_router, prefix="/categories", tags=["categories"])
api_router.include_router(car_models_router, prefix="/car-models", tags=["car-models"])
api_router.include_router(cars_router, prefix="/cars", tags=["cars"])
api_router.include_router(dealers_router, prefix="/dealers", tags=["dealers"])
api_router.include_router(search_router, prefix="/search", tags=["search"])
api_router.include_router(rentals_router, prefix="/rentals", tags=["rentals"])
api_router.include_router(reviews_router, prefix="/reviews", tags=["reviews"])
api_router.include_router(wishlists_router, prefix="/wishlists", tags=["wishlists"])
