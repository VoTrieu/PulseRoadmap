from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_organization_id, require_organization_roles
from app.core.rbac import WRITE_ORGANIZATION_ROLES
from app.schemas.roadmap import (
    RoadmapFeatureCreate,
    RoadmapFeatureItem,
    RoadmapFeatureUpdate,
    RoadmapFeatureListResponse,
    RoadmapStatus,
    RoadmapPriority,
)
from app.data.db.session import get_db
from app.data.repositories import roadmap_repository
from app.core.pagination import paginate


router = APIRouter(prefix="/roadmap", tags=["roadmap"])


@router.get("", response_model=RoadmapFeatureListResponse)
def list_features(
    search: str | None = None,
    status: RoadmapStatus | None = None,
    priority: RoadmapPriority | None = None,
    product_area: str | None = None,
    skip: int = Query(default=0, ge=0),
    take: int = Query(default=10, ge=1, le=100),
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> RoadmapFeatureListResponse:
    items, total = roadmap_repository.list_features(
        db, organization_id, search, status, priority, product_area, skip, take
    )

    return RoadmapFeatureListResponse(**paginate(items, total, skip, take))


@router.post("", response_model=RoadmapFeatureItem, status_code=201)
def create_feature(
    payload: RoadmapFeatureCreate,
    organization_id: str = Depends(get_current_organization_id),
    _membership=Depends(require_organization_roles(*WRITE_ORGANIZATION_ROLES)),
    db: Session = Depends(get_db),
) -> RoadmapFeatureItem:
    return roadmap_repository.create_feature(db, organization_id, payload)


@router.get("/{feature_id}", response_model=RoadmapFeatureItem)
def get_feature_by_id(
    feature_id: str,
    organization_id: str = Depends(get_current_organization_id),
    db: Session = Depends(get_db),
) -> RoadmapFeatureItem:
    feature = roadmap_repository.get_feature_by_id(db, organization_id, feature_id)

    if feature is None:
        raise HTTPException(status_code=404, detail="Roadmap feature not found")

    return feature


@router.patch("/{feature_id}", response_model=RoadmapFeatureItem)
def update_feature(
    feature_id: str,
    payload: RoadmapFeatureUpdate,
    organization_id: str = Depends(get_current_organization_id),
    _membership=Depends(require_organization_roles(*WRITE_ORGANIZATION_ROLES)),
    db: Session = Depends(get_db),
) -> RoadmapFeatureItem:
    feature = roadmap_repository.update_feature(db, organization_id, feature_id, payload)

    if feature is None:
        raise HTTPException(status_code=404, detail="Roadmap feature not found")

    return feature


@router.delete("/{feature_id}", status_code=204)
def delete_feature(
    feature_id: str,
    organization_id: str = Depends(get_current_organization_id),
    _membership=Depends(require_organization_roles(*WRITE_ORGANIZATION_ROLES)),
    db: Session = Depends(get_db),
) -> Response:
    was_deleted = roadmap_repository.delete_feature(db, organization_id, feature_id)

    if not was_deleted:
        raise HTTPException(status_code=404, detail="Roadmap feature not found")

    return Response(status_code=204)
