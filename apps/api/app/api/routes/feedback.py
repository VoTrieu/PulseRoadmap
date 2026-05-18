from fastapi import APIRouter

from app.data.feedback_sample_data import feedback_items
from app.schemas.feedback import FeedbackItem

router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.get("", response_model=list[FeedbackItem])
def list_feedback() -> list[FeedbackItem]:
    return feedback_items

