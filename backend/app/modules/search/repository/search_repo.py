from typing import List, Optional, Tuple, Dict, Any
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select, func, or_, desc, asc

from app.modules.listings.models.car import Car
from app.modules.listings.models.car_model import CarModel
from app.modules.listings.models.brand import Brand
from app.modules.dealers.models.dealer import Dealer
from app.modules.search.models.search_log import SearchLog


class SearchRepository:
    
    def search_cars(
        self, 
        db: Session, 
        query_str: Optional[str] = None,
        filters: Optional[Dict[str, Any]] = None,
        sort_by: str = "newest",
        skip: int = 0,
        limit: int = 20
    ) -> Tuple[List[Car], int]:
        filters = filters or {}
        
        # Base query joined with relevant tables for searching/filtering
        stmt = select(Car).join(Car.car_model).join(CarModel.brand).join(Car.dealer)
        stmt = stmt.where(Car.is_deleted == False)

        # 1. Full-Text Search via ilike
        if query_str:
            search_term = f"%{query_str}%"
            stmt = stmt.where(
                or_(
                    Brand.name.ilike(search_term),
                    CarModel.name.ilike(search_term),
                    Car.variant.ilike(search_term),
                    Dealer.name.ilike(search_term)
                )
            )

        # 2. Filters
        if filters.get("brand"):
            stmt = stmt.where(Brand.name.ilike(f"%{filters['brand']}%") | Brand.slug.ilike(f"%{filters['brand']}%"))
        if filters.get("model"):
            stmt = stmt.where(CarModel.name.ilike(f"%{filters['model']}%") | CarModel.slug.ilike(f"%{filters['model']}%"))
        if filters.get("variant"):
            stmt = stmt.where(Car.variant.ilike(f"%{filters['variant']}%"))
        if filters.get("dealer"):
            stmt = stmt.where(Dealer.name.ilike(f"%{filters['dealer']}%") | Dealer.slug.ilike(f"%{filters['dealer']}%"))
        if filters.get("fuel_type"):
            stmt = stmt.where(Car.fuel_type == filters["fuel_type"])
        if filters.get("transmission"):
            stmt = stmt.where(Car.transmission == filters["transmission"])
        if filters.get("body_style"):
            stmt = stmt.where(CarModel.body_style == filters["body_style"])
        if filters.get("exterior_color"):
            stmt = stmt.where(Car.exterior_color.ilike(f"%{filters['exterior_color']}%"))
        if filters.get("seating_capacity"):
            stmt = stmt.where(Car.seating_capacity == filters["seating_capacity"])
        if filters.get("min_price") is not None:
            stmt = stmt.where(Car.price >= filters["min_price"])
        if filters.get("max_price") is not None:
            stmt = stmt.where(Car.price <= filters["max_price"])
        if filters.get("min_mileage") is not None:
            stmt = stmt.where(Car.mileage >= filters["min_mileage"])
        if filters.get("max_mileage") is not None:
            stmt = stmt.where(Car.mileage <= filters["max_mileage"])
        if filters.get("min_year") is not None:
            stmt = stmt.where(Car.year >= filters["min_year"])
        if filters.get("max_year") is not None:
            stmt = stmt.where(Car.year <= filters["max_year"])
        if filters.get("location"):
            loc = f"%{filters['location']}%"
            stmt = stmt.where(
                or_(
                    Dealer.city.ilike(loc),
                    Dealer.state.ilike(loc)
                )
            )

        # Count total
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total = db.scalar(count_stmt) or 0

        # Eager load relationships to avoid N+1
        stmt = stmt.options(
            selectinload(Car.images),
            selectinload(Car.car_model).selectinload(CarModel.brand),
            selectinload(Car.dealer)
        )

        # 3. Sorting
        if sort_by == "price_asc":
            stmt = stmt.order_by(asc(Car.price))
        elif sort_by == "price_desc":
            stmt = stmt.order_by(desc(Car.price))
        elif sort_by == "mileage_asc":
            stmt = stmt.order_by(asc(Car.mileage))
        elif sort_by == "year_desc":
            stmt = stmt.order_by(desc(Car.year))
        elif sort_by == "oldest":
            stmt = stmt.order_by(asc(Car.created_at))
        else:
            # "newest"
            stmt = stmt.order_by(desc(Car.created_at))

        # Pagination
        stmt = stmt.offset(skip).limit(limit)
        
        items = list(db.scalars(stmt).all())
        return items, total

    def log_search(self, db: Session, query: str, user_id: Optional[str] = None):
        if not query or len(query.strip()) < 2:
            return
        query = query.strip().lower()
        log = db.scalars(select(SearchLog).where(SearchLog.query == query)).first()
        if log:
            log.count += 1
        else:
            log = SearchLog(query=query, user_id=user_id, count=1)
            db.add(log)
        db.commit()

    def get_popular_searches(self, db: Session, limit: int = 5) -> List[str]:
        stmt = select(SearchLog.query).order_by(desc(SearchLog.count), desc(SearchLog.updated_at)).limit(limit)
        return list(db.scalars(stmt).all())

    def get_suggestions(self, db: Session, query: str, limit: int = 5) -> List[str]:
        search_term = f"%{query}%"
        # Combine distinct car models and brands for suggestions
        model_stmt = select(CarModel.name).where(CarModel.name.ilike(search_term)).distinct().limit(limit)
        brand_stmt = select(Brand.name).where(Brand.name.ilike(search_term)).distinct().limit(limit)
        
        models = list(db.scalars(model_stmt).all())
        brands = list(db.scalars(brand_stmt).all())
        
        # Deduplicate and limit
        suggestions = list(set(models + brands))
        # Sort by match proximity / alphabetically and limit
        suggestions.sort(key=lambda x: (not x.lower().startswith(query.lower()), x))
        return suggestions[:limit]

search_repo = SearchRepository()
