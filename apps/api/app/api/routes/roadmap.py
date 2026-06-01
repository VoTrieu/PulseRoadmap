from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app.schemas.roadmap import RoadmapFeatureCreate, RoadmapFeatureItem, RoadmapFeatureUpdate
from app.data.db.session import get_db
from app.data.repositories import roadmap_repository


router = APIRouter(prefix="/roadmap", tags=["roadmap"])


@router.get("", response_model=list[RoadmapFeatureItem])
def list_feedback(db: Session = Depends(get_db)) -> list[RoadmapFeatureItem]:
    return roadmap_repository.list_features(db)


@router.post("", response_model=RoadmapFeatureItem, status_code=201)
def create_feedback(
    payload: RoadmapFeatureCreate, db: Session = Depends(get_db)
) -> RoadmapFeatureItem:
    return roadmap_repository.create_feature(db, payload)


@router.get("/{feature_id}", response_model=RoadmapFeatureItem)
def get_feature_by_id(
    feature_id: str, db: Session = Depends(get_db)
) -> RoadmapFeatureItem:
    feature = roadmap_repository.get_feature_by_id(db, feature_id)

    if feature is None:
        raise HTTPException(status_code=404, detail="Roadmap feature not found")

    return feature


@router.patch("/{feature_id}", response_model=RoadmapFeatureItem)
def update_feature(
    feature_id: str, payload: RoadmapFeatureUpdate, db: Session = Depends(get_db)
) -> RoadmapFeatureItem:
    feature = roadmap_repository.update_feature(db, feature_id, payload)

    if feature is None:
        raise HTTPException(status_code=404, detail="Roadmap feature not found")

    return feature


@router.delete("/{feature_id}", status_code=204)
def delete_feature(feature_id: str, db: Session = Depends(get_db)) -> Response:
    was_deleted = roadmap_repository.delete_feature(db, feature_id)

    if not was_deleted:
        raise HTTPException(status_code=404, detail="Roadmap feature not found")

    return Response(status_code=204)
