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

def create_category(db: Session, category: schemas.CategoryCreate):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Category).offset(skip).limit(limit).all()

def delete_category(db: Session, category_id: int):
    category = db.query(models.Category).filter(models.category.id == category_id).first()
    if category:
        db.delete(category)
        db.commit()
    return category

def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transactions(db: Session):
    return db.query(models.Transaction).all()

def delete_transaction(db: Session, transaction_id: int):
    transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if transaction:
        db.delete(transaction)
        db.commit()
    return transaction

def create_loan(db: Session, loan: schemas.LoanCreate):
    db_loan = models.Loan(**loan.dict())
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan

def get_loans(db: Session):
    return db.query(models.Loan).all()

def get_loan(db: Session, loan_id: int):
    return db.query(models.Loan).filter(models.Loan.id == loan_id).first()

def delete_loan(db: Session, loan_id: int):
    db_loan = get_loan(db, loan_id)
    if db_loan:
        db.delete(db_loan)
        db.commit()
    return db_loan

def update_loan(db: Session, loan_id: int, loan: schemas.LoanUpdate):
    db_loan = get_loan(db, loan_id)
    if db_loan:
        for key, value in loan.dict().items():
            setattr(db_loan, key, value)
        db.commit()
        db.refresh(db_loan)
    return db_loan
    