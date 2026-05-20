from uuid import uuid4
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.data.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate


def list_feedbacks(db: Session) -> list[Feedback]:
    statements = select(Feedback).order_by(
        Feedback.created_at.desc(),
        Feedback.id.desc(),
    )
    return list(db.scalars(statements))

def create_feedback(db: Session, payload: FeedbackCreate) -> Feedback:
    feedback = Feedback(
        id=f"fb-{uuid4().hex[:8]}",
        **payload.model_dump(),
    )
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback
