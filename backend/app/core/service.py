from typing import Any, List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException

class BaseService:
    def __init__(self, repository: Any):
        self.repository = repository

    def get(self, db: Session, id: str) -> Any:
        obj = self.repository.get(db=db, id=id)
        if not obj:
            raise HTTPException(status_code=404, detail="Item not found")
        return obj

    def get_multi(self, db: Session, skip: int = 0, limit: int = 100, filters: dict = None) -> List[Any]:
        return self.repository.get_multi(db=db, skip=skip, limit=limit, filters=filters)

    def count(self, db: Session, filters: dict = None) -> int:
        return self.repository.count(db=db, filters=filters)

    def create(self, db: Session, obj_in: Any) -> Any:
        return self.repository.create(db=db, obj_in=obj_in)

    def update(self, db: Session, id: str, obj_in: Any) -> Any:
        db_obj = self.get(db=db, id=id)
        return self.repository.update(db=db, db_obj=db_obj, obj_in=obj_in)

    def remove(self, db: Session, id: str) -> Any:
        obj = self.get(db=db, id=id)
        return self.repository.remove(db=db, id=id)
