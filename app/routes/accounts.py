from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Account)
def create_account(account: schemas.AccountCreate, db: Session = Depends(get_db)):
    return crud.create_account(db=db, account=account)

@router.get("/", response_model=list[schemas.Account])
def read_accounts(db: Session = Depends(get_db)):
    return crud.get_account(db=db)

@router.delete("/{account_id}", response_model=schemas.Account)
def delete_account(account_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_account(db=db, account_id=account_id)
    if not deleted:
        return {"detail": "Account not found"}
    return deleted

@router.put("/{account_id}", response_model=schemas.Account)
def update_account(account_id: int, account: schemas.AccountCreate, db: Session = Depends(get_db)):
    updated = crud.update_account(db=db, account_id=account_id, updated_data=account)
    if not updated:
        return {"detail": "Account not found"}
    return updated