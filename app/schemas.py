from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class AccountBase(BaseModel):
    name: str
    type: str
    currency: str

class AccountCreate(AccountBase):
    pass

class Account(AccountCreate):
    id: int

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    type: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    account_id: int
    date: date
    amount: float
    category_id: Optional[int] = None
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int

    class Config:
        from_attributes = True