from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.db import SessionLocal
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Goal)
def create_goal(goal: schemas.GoalCreate, db: Session = Depends(get_db)):
    return crud.create_goal(db=db, goal=goal)

@router.get("/", response_model=list[schemas.Goal])
def read_goals(db: Session = Depends(get_db)):
    return crud.get_goals(db=db)

@router.get("/{goal_id}", response_model=schemas.Goal)
def read_goal(goal_id: int, db: Session = Depends(get_db)):
    db_goal = crud.get_goal(db=db, goal_id=goal_id)
    if db_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    return db_goal