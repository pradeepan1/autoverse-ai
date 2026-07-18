from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from pydantic import BaseModel
from app.db.base_class import Base
from datetime import datetime

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        return db.scalars(
            select(self.model)
            .where(self.model.id == id, self.model.is_deleted == False)
        ).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100, filters: dict = None
    ) -> List[ModelType]:
        query = select(self.model).where(self.model.is_deleted == False)
        
        if filters:
            for attr, value in filters.items():
                if hasattr(self.model, attr) and value is not None:
                    query = query.where(getattr(self.model, attr) == value)
                    
        query = query.offset(skip).limit(limit)
        return db.scalars(query).all()

    def count(self, db: Session, *, filters: dict = None) -> int:
        query = select(func.count(self.model.id)).where(self.model.is_deleted == False)
        
        if filters:
            for attr, value in filters.items():
                if hasattr(self.model, attr) and value is not None:
                    query = query.where(getattr(self.model, attr) == value)
                    
        return db.scalar(query) or 0

    def create(self, db: Session, *, obj_in: CreateSchemaType | dict) -> ModelType:
        obj_in_data = obj_in if isinstance(obj_in, dict) else obj_in.model_dump()
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        obj_data = {c.name: getattr(db_obj, c.name) for c in db_obj.__table__.columns}
        
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
            
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
                
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: str) -> Optional[ModelType]:
        """
        Soft delete the object.
        """
        obj = self.get(db=db, id=id)
        if obj:
            obj.is_deleted = True
            obj.deleted_at = datetime.utcnow()
            db.add(obj)
            db.commit()
        return obj
