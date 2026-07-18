"""
AutoVerse AI — SQLAlchemy Declarative Base (Skeleton).

No table models are defined here. Per-module models live under
app/modules/<module>/models/ and will import Base from this file
once table definitions are introduced in a later development phase.
"""

from app.db.base_class import Base

# Import all models here so Alembic can discover them
from app.modules.auth.models.user import User
from app.modules.dealers.models.dealer import Dealer
from app.modules.listings.models.brand import Brand
from app.modules.listings.models.category import Category
from app.modules.listings.models.car_model import CarModel
from app.modules.listings.models.car import Car
from app.modules.listings.models.car_image import CarImage
from app.modules.rentals.models.rental import Rental
from app.modules.reviews.models.review import Review
from app.modules.wishlist.models.wishlist import Wishlist

