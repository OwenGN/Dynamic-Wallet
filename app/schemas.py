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

class LoanBase(BaseModel):
    account_id: int
    borrower_name: str
    loan_type: str  # e.g. "given", "received"
    amount: float
    interest_rate: Optional[float] = None
    start_date: date
    due_date: Optional[date] = None
    status: str  # e.g. "active", "repaid", "defaulted"
    notes: Optional[str] = None

class LoanCreate(LoanBase):
    pass

class Loan(LoanBase):
    id: int

    class Config:
        from_attributes = True

class LoanUpdate(BaseModel):
    borrower_name: Optional[str] = None
    loan_type: Optional[str] = None
    amount: Optional[float] = None
    interest_rate: Optional[float] = None
    start_date: Optional[date] = None
    due_date: Optional[date] = None
    status: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True