from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.types import Enum
from datetime import datetime
import enum
from app.db import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # e.g. "bank", "credit card", "investment", etc.
    currency = Column(String, nullable=False)

    transactions = relationship("Transaction", back_populates="account")
    loans = relationship("Loan", back_populates="account", cascade="all, delete")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)

    transactions = relationship("Transaction", back_populates="category")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String)

    account = relationship("Account", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=True)


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    borrower_name = Column(String, nullable=False)
    loan_type = Column(String)  # e.g. "given", "received"
    amount = Column(Float, nullable=False)
    interest_rate = Column(Float)
    start_date = Column(Date, nullable=False)
    due_date = Column(Date)
    status = Column(String, nullable=False)  # e.g. "active", "repaid", "defaulted"
    notes = Column(String)

    account = relationship("Account", back_populates="loans")

class GoalType(enum.Enum):
    SAVINGS = "savings"
    DEBT = "debt"

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
    target_date = Column(Date, nullable=False)
    current_amount = Column(Float, default=0.0)
    type = Column(Enum(GoalType), nullable=False)

    created_at = Column(Date, default=datetime.utcnow)