from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app import schemas, crud

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
def read_transactions(db: Session = Depends(get_db)):
    return crud.get_transactions(db=db)

@router.delete("/{transaction_id}", response_model=schemas.Transaction)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_transaction(db=db, transaction_id=transaction_id)
    if not deleted:
        return {"detail": "Transaction not found"}
    return deleted