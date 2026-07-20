import time
from typing import List, Optional, Tuple, Dict, Any
from sqlalchemy.orm import Session
from app.modules.search.repository.search_repo import search_repo
from app.modules.listings.models.car import Car

# Simple in-memory cache for popular searches and suggestions
_popular_searches_cache = {"data": [], "timestamp": 0}
CACHE_TTL = 300  # 5 minutes


class SearchService:

    def search_cars(
        self, 
        db: Session, 
        query: Optional[str] = None,
        filters: Optional[Dict[str, Any]] = None,
        sort_by: str = "newest",
        skip: int = 0,
        limit: int = 20,
        user_id: Optional[str] = None
    ) -> Tuple[List[Car], int]:
        
        # Log the search query in background/sync for popular searches
        if query:
            search_repo.log_search(db, query, user_id)
            
        return search_repo.search_cars(
            db=db,
            query_str=query,
            filters=filters,
            sort_by=sort_by,
            skip=skip,
            limit=limit
        )

    def get_popular_searches(self, db: Session, limit: int = 5) -> List[str]:
        current_time = time.time()
        if current_time - _popular_searches_cache["timestamp"] < CACHE_TTL and _popular_searches_cache["data"]:
            return _popular_searches_cache["data"]
            
        results = search_repo.get_popular_searches(db, limit)
        
        _popular_searches_cache["data"] = results
        _popular_searches_cache["timestamp"] = current_time
        
        return results

    def get_suggestions(self, db: Session, query: str, limit: int = 5) -> List[str]:
        if not query or len(query.strip()) < 2:
            return []
        
        # We could cache suggestions here as well using an LRU cache, 
        # but the DB query is optimized and lightweight.
        return search_repo.get_suggestions(db, query, limit)

search_service = SearchService()
