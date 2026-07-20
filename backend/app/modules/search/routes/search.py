from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.search.schemas.search import SearchResponse, SuggestionResponse, PopularSearchResponse
from app.modules.search.services.search_service import search_service

router = APIRouter()


@router.get("", response_model=SearchResponse)
def search_cars(
    q: Optional[str] = Query(None, description="Search query string"),
    brand: Optional[str] = Query(None, description="Filter by brand"),
    model: Optional[str] = Query(None, description="Filter by model"),
    variant: Optional[str] = Query(None, description="Filter by variant"),
    dealer: Optional[str] = Query(None, description="Filter by dealer"),
    fuel_type: Optional[str] = Query(None, description="Filter by fuel type"),
    transmission: Optional[str] = Query(None, description="Filter by transmission"),
    body_style: Optional[str] = Query(None, description="Filter by body style"),
    exterior_color: Optional[str] = Query(None, description="Filter by exterior color"),
    seating_capacity: Optional[int] = Query(None, description="Filter by seating capacity"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    min_mileage: Optional[int] = Query(None, description="Minimum mileage"),
    max_mileage: Optional[int] = Query(None, description="Maximum mileage"),
    min_year: Optional[int] = Query(None, description="Minimum year"),
    max_year: Optional[int] = Query(None, description="Maximum year"),
    location: Optional[str] = Query(None, description="Dealer location"),
    sort_by: str = Query("newest", description="Sort by field: price_asc, price_desc, newest, oldest, mileage_asc, year_desc"),
    skip: int = Query(0, ge=0, description="Pagination skip"),
    limit: int = Query(20, ge=1, le=100, description="Pagination limit"),
    db: Session = Depends(get_db)
    # user_id would be extracted from token if user is authenticated (Optional)
):
    filters = {
        "brand": brand,
        "model": model,
        "variant": variant,
        "dealer": dealer,
        "fuel_type": fuel_type,
        "transmission": transmission,
        "body_style": body_style,
        "exterior_color": exterior_color,
        "seating_capacity": seating_capacity,
        "min_price": min_price,
        "max_price": max_price,
        "min_mileage": min_mileage,
        "max_mileage": max_mileage,
        "min_year": min_year,
        "max_year": max_year,
        "location": location
    }
    
    # Remove None values
    filters = {k: v for k, v in filters.items() if v is not None}
    
    items, total = search_service.search_cars(
        db=db,
        query=q,
        filters=filters,
        sort_by=sort_by,
        skip=skip,
        limit=limit,
        user_id=None # Replace with current_user.id if available
    )
    
    return SearchResponse(
        items=items,
        total=total,
        skip=skip,
        limit=limit
    )

@router.get("/suggestions", response_model=SuggestionResponse)
def get_search_suggestions(
    q: str = Query(..., min_length=2, description="Search query string"),
    limit: int = Query(5, ge=1, le=20, description="Pagination limit"),
    db: Session = Depends(get_db)
):
    suggestions = search_service.get_suggestions(db=db, query=q, limit=limit)
    return SuggestionResponse(suggestions=suggestions)

@router.get("/popular", response_model=PopularSearchResponse)
def get_popular_searches(
    limit: int = Query(5, ge=1, le=20, description="Pagination limit"),
    db: Session = Depends(get_db)
):
    queries = search_service.get_popular_searches(db=db, limit=limit)
    return PopularSearchResponse(queries=queries)
