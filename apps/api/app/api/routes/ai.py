from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_organization_id
from app.data.db.session import get_db
from app.data.repositories import ai_repository
from app.schemas.ai import AiAssistantContextResponse, AiBriefRequest, AiBriefResponse
from app.services import ai_brief_service

router = APIRouter(prefix="/ai", tags=["ai"])


@router.get("/context", response_model=AiAssistantContextResponse)
def get_assistant_context(
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> AiAssistantContextResponse:
    context = ai_repository.get_product_context(db, organization_id)
    return ai_brief_service.build_assistant_context(context)


@router.post("/brief", response_model=AiBriefResponse)
def generate_product_brief(
    payload: AiBriefRequest,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> AiBriefResponse:
    context = ai_repository.get_product_context(db, organization_id)

    try:
        return ai_brief_service.generate_product_brief(payload, context)
    except ValueError as error:
        raise HTTPException(status_code=503, detail=str(error)) from error
