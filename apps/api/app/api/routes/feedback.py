from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_organization_id, require_organization_roles
from app.core.rbac import WRITE_ORGANIZATION_ROLES
from app.core.pagination import paginate
from app.data.db.session import get_db
from app.data.repositories import feedback_repository
from app.schemas.feedback import (
    FeedbackCreate,
    FeedbackItem,
    FeedbackListResponse,
    FeedbackUpdate,
    FeedbackUrgency,
)

router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.get("", response_model=FeedbackListResponse)
def list_feedback(
    search: str | None = None,
    product_area: str | None = None,
    urgency: FeedbackUrgency | None = None,
    skip: int = Query(default=0, ge=0),
    take: int = Query(default=10, ge=1, le=100),
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> FeedbackListResponse:
    items, total = feedback_repository.list_feedbacks(
        db,
        organization_id=organization_id,
        search=search,
        product_area=product_area,
        urgency=urgency,
        skip=skip,
        take=take,
    )

    return FeedbackListResponse(**paginate(items, total, skip, take))


@router.post("", response_model=FeedbackItem, status_code=201)
def create_feedback(
    payload: FeedbackCreate,
    organization_id: str = Depends(get_current_organization_id),
    _membership=Depends(require_organization_roles(*WRITE_ORGANIZATION_ROLES)),
    db: Session = Depends(get_db),
) -> FeedbackItem:
    return feedback_repository.create_feedback(db, organization_id, payload)


@router.get("/{feedback_id}", response_model=FeedbackItem)
def get_feedback_by_id(
    feedback_id: str,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> FeedbackItem:
    feedback = feedback_repository.get_feedback_by_id(
        db, organization_id, feedback_id
    )

    if feedback is None:
        raise HTTPException(status_code=404, detail="Feedback not found")

    return feedback


@router.delete("/{feedback_id}", status_code=204)
def delete_feedback(
    feedback_id: str,
    organization_id: str = Depends(get_current_organization_id),
    _membership=Depends(require_organization_roles(*WRITE_ORGANIZATION_ROLES)),
    db: Session = Depends(get_db),
) -> Response:
    was_deleted = feedback_repository.delete_feedback(db, organization_id, feedback_id)

    if not was_deleted:
        raise HTTPException(status_code=404, detail="Feedback not found")

    return Response(status_code=204)


@router.patch("/{feedback_id}", response_model=FeedbackItem)
def update_feedback(
    feedback_id: str,
    payload: FeedbackUpdate,
    organization_id: str = Depends(get_current_organization_id),
    _membership=Depends(require_organization_roles(*WRITE_ORGANIZATION_ROLES)),
    db: Session = Depends(get_db),
) -> FeedbackItem:
    feedback = feedback_repository.update_feedback(
        db, organization_id, feedback_id, payload
    )

    if feedback is None:
        raise HTTPException(status_code=404, detail="Feedback not found")

    return feedback
