from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from .db import Base

class Account(Base):
    __tablename__ = 'accounts'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    currency = Column(String, nullable=False)
    transactions = relationship("Transaction", back_populates="account")
    loans = relationship("Loan", back_populates="account")

class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    transactions = relationship("Transaction", back_populates="category")

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey('accounts.id'), nullable=False)
    date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'))
    description = Column(String)

    account = relationship("Account", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")

class Loan(Base):
    __tablename__ = 'loans'

    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey('accounts.id'), nullable=False)
    amount = Column(Float, nullable=False)
    interest_rate = Column(Float)
    start_date = Column(Date, nullable=False)
    due_date = Column(Date)
    status = Column(String)
    notes = Column(String)

    account = relationship("Account", back_populates="loans")