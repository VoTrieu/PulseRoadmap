from uuid import uuid4

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.data.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate, FeedbackUpdate


def list_feedbacks(
    db: Session,
    organization_id: str,
    search: str | None = None,
    product_area: str | None = None,
    urgency: str | None = None,
    skip: int = 0,
    take: int = 10,
) -> tuple[list[Feedback], int]:

    # 1. Base statement where we apply all shared filters
    base_stmt = select(Feedback).where(Feedback.organization_id == organization_id)
    search_value = search.strip() if search else None

    if search_value:
        pattern = f"%{search_value}%"
        base_stmt = base_stmt.where(
            or_(
                Feedback.customer.ilike(pattern),
                Feedback.request.ilike(pattern),
                Feedback.source.ilike(pattern),
                Feedback.linked_feature.ilike(pattern),
            )
        )

    if product_area:
        base_stmt = base_stmt.where(Feedback.product_area == product_area)

    if urgency:
        base_stmt = base_stmt.where(Feedback.urgency == urgency)

    # 2. Get total count by converting the filtered base statement into a count query
    count_stmt = select(func.count()).select_from(base_stmt.subquery())
    total_count = db.scalar(count_stmt) or 0

    # 3. Apply ordering and pagination to the base statement for final results
    data_stmt = (
        base_stmt.order_by(
            Feedback.created_at.desc(),
            Feedback.id.desc(),
        )
        .offset(skip)
        .limit(take)
    )

    return list(db.scalars(data_stmt)), total_count


def get_feedback_by_id(
    db: Session, organization_id: str, feedback_id: str
) -> Feedback | None:
    statement = select(Feedback).where(
        Feedback.id == feedback_id,
        Feedback.organization_id == organization_id,
    )

    return db.scalar(statement)


def create_feedback(
    db: Session, organization_id: str, payload: FeedbackCreate
) -> Feedback:
    feedback = Feedback(
        id=f"fb-{uuid4().hex[:8]}",
        organization_id=organization_id,
        **payload.model_dump(),
    )

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return feedback


def delete_feedback(db: Session, organization_id: str, feedback_id: str) -> bool:
    feedback = get_feedback_by_id(db, organization_id, feedback_id)

    if feedback is None:
        return False

    db.delete(feedback)
    db.commit()

    return True


def update_feedback(
    db: Session, organization_id: str, feedback_id: str, payload: FeedbackUpdate
) -> Feedback | None:
    feedback = get_feedback_by_id(db, organization_id, feedback_id)

    if feedback is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(feedback, key, value)

    db.commit()
    db.refresh(feedback)

    return feedback
