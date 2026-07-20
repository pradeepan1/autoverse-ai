from typing import List
from pydantic import BaseModel

from app.modules.listings.schemas.car import CarListResponse


class SearchResponse(BaseModel):
    items: List[CarListResponse]
    total: int
    limit: int
    skip: int


class SuggestionResponse(BaseModel):
    suggestions: List[str]


class PopularSearchResponse(BaseModel):
    queries: List[str]
