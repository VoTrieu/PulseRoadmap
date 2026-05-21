from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.data.db.session import get_db
from app.data.repositories import feedback_repository

from app.schemas.feedback import FeedbackCreate, FeedbackItem

router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.get("", response_model=list[FeedbackItem])
def list_feedback(db: Session = Depends(get_db)) -> list[FeedbackItem]:
    return feedback_repository.list_feedbacks(db)


@router.post("", response_model=FeedbackItem, status_code=201)
def create_feedback(payload: FeedbackCreate, db: Session = Depends(get_db)) -> FeedbackItem:
    return feedback_repository.create_feedback(db, payload)

@router.get("/{feedback_id}", response_model=FeedbackItem, status_code=201)
def get_feedback_by_id(feedback_id: str, db: Session = Depends(get_db)) -> FeedbackItem:
    feedback = feedback_repository.get_feedback_by_id(db, feedback_id)
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback
