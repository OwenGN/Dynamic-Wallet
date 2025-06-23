from pydantic import BaseModel

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