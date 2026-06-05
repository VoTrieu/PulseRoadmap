from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session

from app.core.pagination import paginate
from app.data.db.session import get_db
from app.data.repositories import release_repository
from app.schemas.release import (
    ReleaseCreate,
    ReleaseItem,
    ReleaseListResponse,
    ReleaseStatus,
    ReleaseType,
    ReleaseUpdate,
)

router = APIRouter(prefix="/releases", tags=["releases"])


@router.get("", response_model=ReleaseListResponse)
def list_releases(
    search: str | None = None,
    status: ReleaseStatus | None = None,
    release_type: ReleaseType | None = None,
    is_public: bool | None = None,
    skip: int = Query(default=0, ge=0),
    take: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
) -> ReleaseListResponse:
    items, total = release_repository.list_releases(
        db,
        search=search,
        status=status,
        release_type=release_type,
        is_public=is_public,
        skip=skip,
        take=take,
    )

    return ReleaseListResponse(**paginate(items, total, skip, take))


@router.post("", response_model=ReleaseItem, status_code=201)
def create_release(
    payload: ReleaseCreate,
    db: Session = Depends(get_db),
) -> ReleaseItem:
    return release_repository.create_release(db, payload)


@router.get("/{release_id}", response_model=ReleaseItem)
def get_release_by_id(
    release_id: str,
    db: Session = Depends(get_db),
) -> ReleaseItem:
    release = release_repository.get_release_by_id(db, release_id)

    if release is None:
        raise HTTPException(status_code=404, detail="Release not found")

    return release


@router.patch("/{release_id}", response_model=ReleaseItem)
def update_release(
    release_id: str,
    payload: ReleaseUpdate,
    db: Session = Depends(get_db),
) -> ReleaseItem:
    release = release_repository.update_release(db, release_id, payload)

    if release is None:
        raise HTTPException(status_code=404, detail="Release not found")

    return release


@router.delete("/{release_id}", status_code=204)
def delete_release(
    release_id: str,
    db: Session = Depends(get_db),
) -> Response:
    was_deleted = release_repository.delete_release(db, release_id)

    if not was_deleted:
        raise HTTPException(status_code=404, detail="Release not found")

    return Response(status_code=204)