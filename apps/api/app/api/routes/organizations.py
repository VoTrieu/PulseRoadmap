from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.data.db.session import get_db
from app.data.models.auth import User
from app.data.repositories import auth_repository
from app.schemas.auth import OrganizationCreate, OrganizationSummary

router = APIRouter(prefix="/organizations", tags=["organizations"])


@router.post("", response_model=OrganizationSummary, status_code=201)
def create_organization(
    payload: OrganizationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> OrganizationSummary:
    membership = auth_repository.create_organization_for_user(
        db,
        current_user,
        payload,
    )

    return OrganizationSummary(
        id=membership.organization.id,
        name=membership.organization.name,
        slug=membership.organization.slug,
        role=membership.role,
    )
