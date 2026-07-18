from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.repository import CRUDBase
from app.modules.dealers.models.dealer import Dealer
from pydantic import BaseModel

class DealerCreate(BaseModel):
    user_id: str
    name: str
    slug: str
    description: Optional[str] = None
    address: str
    city: str
    state: str
    zip_code: str
    contact_email: str
    contact_phone: str

class DealerUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    contact_phone: Optional[str] = None

class DealerRepository(CRUDBase[Dealer, DealerCreate, DealerUpdate]):
    def get_by_user_id(self, db: Session, user_id: str) -> Optional[Dealer]:
        return db.scalars(
            select(Dealer).where(Dealer.user_id == user_id, Dealer.is_deleted == False)
        ).first()

dealer_repo = DealerRepository(Dealer)
