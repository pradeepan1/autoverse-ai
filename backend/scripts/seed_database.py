import os
import sys
import random
import uuid
import logging
from typing import List, Dict, Any

# Add backend directory to sys.path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import SessionLocal
from app.modules.auth.models.user import User
from app.modules.dealers.models.dealer import Dealer
from app.modules.listings.models.brand import Brand
from app.modules.listings.models.category import Category
from app.modules.listings.models.car_model import CarModel
from app.modules.listings.models.car import Car
from app.modules.listings.models.car_image import CarImage

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

BRANDS = [
    {"name": "Toyota", "country": "Japan", "established_year": 1937},
    {"name": "Honda", "country": "Japan", "established_year": 1948},
    {"name": "Hyundai", "country": "South Korea", "established_year": 1967},
    {"name": "Tata", "country": "India", "established_year": 1945},
    {"name": "Mahindra", "country": "India", "established_year": 1945},
    {"name": "BMW", "country": "Germany", "established_year": 1916},
    {"name": "Mercedes-Benz", "country": "Germany", "established_year": 1926},
    {"name": "Audi", "country": "Germany", "established_year": 1909},
    {"name": "Kia", "country": "South Korea", "established_year": 1944},
    {"name": "MG", "country": "UK", "established_year": 1924}
]

CATEGORIES = [
    {"name": "SUV", "description": "Sport Utility Vehicle"},
    {"name": "Sedan", "description": "Standard 4-door passenger car"},
    {"name": "Hatchback", "description": "Small car with a rear door"},
    {"name": "Coupe", "description": "Two-door passenger car"},
    {"name": "Luxury", "description": "High-end premium vehicles"},
    {"name": "Electric", "description": "Battery electric vehicles"},
    {"name": "Pickup", "description": "Truck with an enclosed cab and open cargo area"},
    {"name": "MPV", "description": "Multi-purpose vehicle / Minivan"}
]

MODELS_MAP = {
    "Toyota": ["Fortuner", "Innova Hycross", "Glanza", "Urban Cruiser", "Camry"],
    "Honda": ["City", "Amaze", "Elevate", "Civic", "CR-V"],
    "Hyundai": ["Creta", "Venue", "Verna", "i20", "Tucson"],
    "Tata": ["Nexon", "Harrier", "Safari", "Punch", "Curvv"],
    "Mahindra": ["Scorpio N", "XUV700", "Thar", "Bolero", "XUV300"],
    "BMW": ["X1", "X5", "3 Series", "5 Series", "Z4"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
    "Audi": ["A4", "A6", "Q3", "Q5", "Q7"],
    "Kia": ["Seltos", "Sonet", "Carens", "EV6"],
    "MG": ["Hector", "Astor", "Gloster", "ZSEV"]
}

CONDITIONS = ["new", "used", "certified"]
FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"]
TRANSMISSIONS = ["Manual", "Automatic", "CVT", "DCT"]
COLORS = ["White", "Black", "Silver", "Grey", "Red", "Blue"]
CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune"]
STATES = ["MH", "DL", "KA", "TG", "TN", "MH"]
STATUSES = ["available", "sold", "reserved"]

def slugify(text: str) -> str:
    return text.lower().replace(" ", "-")

def seed_brands(db: Session) -> Dict[str, str]:
    logger.info("Seeding Brands...")
    brand_ids = {}
    for b in BRANDS:
        slug = slugify(b["name"])
        brand = db.execute(select(Brand).filter_by(slug=slug)).scalar_one_or_none()
        if not brand:
            brand = Brand(
                name=b["name"],
                slug=slug,
                country=b["country"],
                established_year=b["established_year"],
                logo_url=f"https://logo.clearbit.com/{slug}.com"
            )
            db.add(brand)
            try:
                db.commit()
                db.refresh(brand)
            except IntegrityError:
                db.rollback()
        brand_ids[b["name"]] = brand.id
    return brand_ids

def seed_categories(db: Session) -> Dict[str, str]:
    logger.info("Seeding Categories...")
    category_ids = {}
    for c in CATEGORIES:
        slug = slugify(c["name"])
        cat = db.execute(select(Category).filter_by(slug=slug)).scalar_one_or_none()
        if not cat:
            cat = Category(
                name=c["name"],
                slug=slug,
                description=c["description"]
            )
            db.add(cat)
            try:
                db.commit()
                db.refresh(cat)
            except IntegrityError:
                db.rollback()
        category_ids[c["name"]] = cat.id
    return category_ids

def seed_car_models(db: Session, brand_ids: Dict[str, str]) -> List[str]:
    logger.info("Seeding Car Models...")
    model_ids = []
    for brand_name, models in MODELS_MAP.items():
        brand_id = brand_ids.get(brand_name)
        if not brand_id:
            continue
        for m_name in models:
            slug = slugify(f"{brand_name}-{m_name}")
            model = db.execute(select(CarModel).filter_by(slug=slug)).scalar_one_or_none()
            if not model:
                model = CarModel(
                    brand_id=brand_id,
                    name=m_name,
                    slug=slug,
                    body_style=random.choice(["SUV", "Sedan", "Hatchback"])
                )
                db.add(model)
                try:
                    db.commit()
                    db.refresh(model)
                except IntegrityError:
                    db.rollback()
            model_ids.append(model.id)
    return model_ids

def seed_dealer(db: Session) -> str:
    logger.info("Ensuring a seed dealer exists...")
    user = db.execute(select(User).filter_by(email="seed@autoverse.com")).scalar_one_or_none()
    if not user:
        user = User(
            full_name="Seed Dealer",
            email="seed@autoverse.com",
            password_hash="fakehash",
            role="dealer",
            is_verified=True
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
    dealer = db.execute(select(Dealer).filter_by(user_id=user.id)).scalar_one_or_none()
    if not dealer:
        dealer = Dealer(
            user_id=user.id,
            name="AutoVerse Prime Motors",
            slug="autoverse-prime-motors",
            description="Premium dealership for all your needs.",
            address="123 Auto Lane",
            city="Bengaluru",
            state="KA",
            zip_code="560001",
            contact_email="sales@autoverseprime.com",
            contact_phone="9876543210"
        )
        db.add(dealer)
        db.commit()
        db.refresh(dealer)
    return dealer.id

def seed_cars(db: Session, model_ids: List[str], dealer_id: str):
    logger.info("Seeding Cars...")
    count = db.execute(select(Car)).scalars().all()
    if len(count) >= 100:
        logger.info(f"Already have {len(count)} cars. Skipping car seed.")
        return len(count)

    cars_to_create = 100 - len(count)
    created = 0
    
    for _ in range(cars_to_create):
        try:
            model_id = random.choice(model_ids)
            city = random.choice(CITIES)
            state = STATES[CITIES.index(city)]
            condition = random.choice(CONDITIONS)
            year = random.randint(2015, 2024)
            
            features = {
                "title": f"Amazing {year} Model",
                "description": "Well maintained, single owner, excellent condition.",
                "owner_count": random.randint(1, 3) if condition != "new" else 1,
                "city": city,
                "state": state,
                "status": random.choice(STATUSES),
                "featured": random.choice([True, False])
            }
            
            car = Car(
                model_id=model_id,
                dealer_id=dealer_id,
                year=year,
                mileage=random.randint(5000, 100000) if condition != "new" else random.randint(0, 100),
                price=round(random.uniform(5000.0, 50000.0), 2),
                vin=f"VIN{uuid.uuid4().hex[:14].upper()}",
                condition=condition,
                fuel_type=random.choice(FUEL_TYPES),
                transmission=random.choice(TRANSMISSIONS),
                exterior_color=random.choice(COLORS),
                interior_color=random.choice(COLORS),
                features=features
            )
            db.add(car)
            db.commit()
            db.refresh(car)
            
            # Add an image
            img = CarImage(
                car_id=car.id,
                image_url=f"https://loremflickr.com/800/600/car?lock={random.randint(1,1000)}",
                is_primary=True
            )
            db.add(img)
            db.commit()
            
            created += 1
        except IntegrityError:
            db.rollback()
        except Exception as e:
            db.rollback()
            logger.error(f"Failed to create car: {e}")
            
    return len(count) + created

def main():
    db = SessionLocal()
    try:
        brand_ids = seed_brands(db)
        category_ids = seed_categories(db)
        model_ids = seed_car_models(db, brand_ids)
        dealer_id = seed_dealer(db)
        total_cars = seed_cars(db, model_ids, dealer_id)
        
        logger.info("=========================================")
        logger.info("SEEDING COMPLETE")
        logger.info("=========================================")
        logger.info(f"Brands: {len(brand_ids)}")
        logger.info(f"Categories: {len(category_ids)}")
        logger.info(f"Car Models: {len(model_ids)}")
        logger.info(f"Cars: {total_cars}")
        logger.info("=========================================")
        
    finally:
        db.close()

if __name__ == "__main__":
    main()
