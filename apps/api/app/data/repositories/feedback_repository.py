from uuid import uuid4

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.data.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate, FeedbackUpdate


def list_feedbacks(
    db: Session,
    search: str | None = None,
    product_area: str | None = None,
    urgency: str | None = None,
) -> list[Feedback]:
    statement = select(Feedback)
    search_value = search.strip() if search else None

    if search_value:
        pattern = f"%{search_value}%"
        statement = statement.where(
            or_(
                Feedback.customer.ilike(pattern),
                Feedback.request.ilike(pattern),
                Feedback.source.ilike(pattern),
                Feedback.linked_feature.ilike(pattern),
            )
        )

    if product_area:
        statement = statement.where(Feedback.product_area == product_area)

    if urgency:
        statement = statement.where(Feedback.urgency == urgency)

    statement = statement.order_by(
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


def update_feedback(
    db: Session, feedback_id: str, payload: FeedbackUpdate
) -> Feedback | None:
    feedback = db.get(Feedback, feedback_id)

    if feedback is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(feedback, key, value)

    db.commit()
    db.refresh(feedback)

    return feedback
