from app.core.service import BaseService
from app.modules.auth.repository.user_repo import user_repo

class UserService(BaseService):
    def __init__(self):
        super().__init__(repository=user_repo)

user_service = UserService()
