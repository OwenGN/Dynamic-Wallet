from sqlalchemy.orm import Session
from app import models, schemas

def create_account(db: Session, account: schemas.AccountCreate):
    db_account = models.Account(**account.dict())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account
def get_account(db: Session):
    return db.query(models.Account).all()
def delete_account(db: Session, account_id: int):
    account = db.query(models.Account).filter(models.Account.id == account_id).first()
    if account:
        db.delete(account)
        db.commit()
    return account

def update_account(db: Session, account_id: int, updated_data: schemas.AccountCreate):
    account = db.query(models.Account).filter(models.Account.id == account_id).first()
    if account:
        for key, value in updated_data.dict().items():
            setattr(account, key, value)
        db.commit()
        db.refresh(account)
    return account
    