from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Loan)
def create_loan(loan: schemas.LoanCreate, db: Session = Depends(get_db)):
    return crud.create_loan(db=db, loan=loan)

@router.get("/{loan_id}", response_model=schemas.Loan)
def read_loan(loan_id: int, db: Session = Depends(get_db)):
    db_loan = crud.get_loan(db=db, loan_id=loan_id)
    if db_loan is None:
        raise HTTPException(status_code=404, detail="Loan not found")
    return db_loan

@router.get("/", response_model=list[schemas.Loan])
def read_loans(db: Session = Depends(get_db)):
    return crud.get_loans(db=db)

@router.put("/{loan_id}", response_model=schemas.Loan)
def update_loan(loan_id: int, loan: schemas.LoanUpdate, db: Session = Depends(get_db)):
    db_loan = crud.get_loan(db=db, loan_id=loan_id)
    if db_loan is None:
        raise HTTPException(status_code=404, detail="Loan not found")
    return crud.update_loan(db=db, loan_id=loan_id, loan=loan)

@router.delete("/{loan_id}", response_model=schemas.Loan)
def delete_loan(loan_id: int, db: Session = Depends(get_db)):
    db_loan = crud.delete_loan(db=db, loan_id=loan_id)
    if db_loan is None:
        raise HTTPException(status_code=404, detail="Loan not found")
    return db_loan
