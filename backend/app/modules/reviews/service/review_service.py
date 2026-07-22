from app.core.service import BaseService
from app.modules.reviews.repository.review_repo import review_repo

class ReviewService(BaseService):
    def __init__(self):
        super().__init__(repository=review_repo)

review_service = ReviewService()
