from fastapi import APIRouter

from app.data.feedback_sample_data import feedback_items
from app.schemas.feedback import FeedbackCreate, FeedbackItem

router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.get("", response_model=list[FeedbackItem])
def list_feedback() -> list[FeedbackItem]:
    return feedback_items


@router.post("", response_model=FeedbackItem, status_code=201)
def create_feedback(payload: FeedbackCreate) -> FeedbackItem:
    feedback = FeedbackItem(
        id=f"fb-{1001 + len(feedback_items)}",
        **payload.model_dump(),
    )
    feedback_items.insert(0, feedback)

    return feedback
