from app.db import Base, engine
from app import models
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import accounts, transactions, categories, loans

app = FastAPI(title='Dynamic Wallet API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router, prefix="/accounts", tags=["Accounts"])
app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
app.include_router(categories.router, prefix="/categories", tags=["Categories"])
app.include_router(loans.router, prefix="/loans", tags=["Loans"])

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")