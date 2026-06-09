from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_organization_id
from app.core.pagination import paginate
from app.data.db.session import get_db
from app.data.repositories import bug_repository
from app.schemas.bug import (
    BugReportCreate,
    BugReportItem,
    BugReportListResponse,
    BugReportUpdate,
    BugSeverity,
    BugStatus,
)

router = APIRouter(prefix="/bugs", tags=["bugs"])


@router.get("", response_model=BugReportListResponse)
def list_bugs(
    search: str | None = None,
    severity: BugSeverity | None = None,
    status: BugStatus | None = None,
    product_area: str | None = None,
    skip: int = Query(default=0, ge=0),
    take: int = Query(default=10, ge=1, le=100),
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> BugReportListResponse:
    items, total = bug_repository.list_bugs(
        db, organization_id, search, severity, status, product_area, skip, take
    )

    return BugReportListResponse(**paginate(items, total, skip, take))


@router.post("", response_model=BugReportItem, status_code=201)
def create_bug(
    payload: BugReportCreate,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> BugReportItem:
    return bug_repository.create_bug(db, organization_id, payload)


@router.get("/{bug_id}", response_model=BugReportItem)
def get_bug_by_id(
    bug_id: str,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> BugReportItem:
    bug = bug_repository.get_bug_by_id(db, organization_id, bug_id)

    if bug is None:
        raise HTTPException(status_code=404, detail="Bug report not found")

    return bug


@router.patch("/{bug_id}", response_model=BugReportItem)
def update_bug(
    bug_id: str,
    payload: BugReportUpdate,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> BugReportItem:
    bug = bug_repository.update_bug(db, organization_id, bug_id, payload)

    if bug is None:
        raise HTTPException(status_code=404, detail="Bug report not found")

    return bug


@router.delete("/{bug_id}", status_code=204)
def delete_bug(
    bug_id: str,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> Response:
    was_deleted = bug_repository.delete_bug(db, organization_id, bug_id)

    if not was_deleted:
        raise HTTPException(status_code=404, detail="Bug report not found")

    return Response(status_code=204)
