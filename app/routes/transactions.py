from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app import schemas, crud, models
from typing import Optional
from datetime import date

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Transaction)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    return crud.create_transaction(db=db, transaction=transaction)

@router.get("/", response_model=list[schemas.Transaction])
def get_transactions(db: Session = Depends(get_db),
                      account_id: Optional[int] = None,
                      category_id: Optional[int] = None,
                      start_date: Optional[date] = None,
                      end_date: Optional[date] = None,
                      ):
    
    query = db.query(models.Transaction)
    if account_id:
        query = query.filter(schemas.Transaction.account_id == account_id)
    if category_id:
        query = query.filter(schemas.Transaction.category_id == category_id)
    if start_date:
        query = query.filter(schemas.Transaction.date >= start_date)
    if end_date:
        query = query.filter(schemas.Transaction.date <= end_date)

    return crud.get_transactions(db=db)

@router.delete("/{transaction_id}", response_model=schemas.Transaction)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_transaction(db=db, transaction_id=transaction_id)
    if not deleted:
        return {"detail": "Transaction not found"}
    return deleted