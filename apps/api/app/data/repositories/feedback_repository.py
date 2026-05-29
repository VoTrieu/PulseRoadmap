from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.data.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate


def list_feedbacks(db: Session) -> list[Feedback]:
    statement = select(Feedback).order_by(
        Feedback.created_at.desc(),
        Feedback.id.desc(),
    )

    return list(db.scalars(statement))


def get_feedback_by_id(db: Session, feedback_id: str) -> Feedback | None:
    return db.get(Feedback, feedback_id)


def create_feedback(db: Session, payload: FeedbackCreate) -> Feedback:
    feedback = Feedback(
        id=f"fb-{uuid4().hex[:8]}",
        **payload.model_dump(),
    )

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return feedback


def delete_feedback(db: Session, feedback_id: str) -> bool:
    feedback = db.get(Feedback, feedback_id)

    if feedback is None:
        return False

    db.delete(feedback)
    db.commit()

    return True
