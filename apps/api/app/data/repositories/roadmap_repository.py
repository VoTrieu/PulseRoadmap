from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.data.models.roadmap import RoadMapFeature
from app.schemas.roadmap import RoadmapFeatureCreate, RoadmapFeatureUpdate

def list_features(db: Session) -> list[RoadMapFeature]:
    statement = select(RoadMapFeature).order_by(
        RoadMapFeature.created_at.desc(),
        RoadMapFeature.id.desc(),
    )
    return list(db.scalars(statement))

def get_feature_by_id(db: Session, feature_id: str) -> RoadMapFeature | None:
    return db.get(RoadMapFeature, feature_id)

def create_feature(db: Session, payload: RoadmapFeatureCreate) -> RoadMapFeature:
    feature = RoadMapFeature(
        id=f"rf-{uuid4().hex[:8]}",
        **payload.model_dump(),
    )

    db.add(feature)
    db.commit()
    db.refresh(feature)

    return feature

def update_feature(
    db: Session, feature_id: str, payload: RoadmapFeatureUpdate
) -> RoadMapFeature | None:
    feature = db.get(RoadMapFeature, feature_id)

    if feature is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(feature, key, value)

    db.commit()
    db.refresh(feature)

    return feature

def delete_feature(db: Session, feature_id: str) -> bool:
    feature = db.get(RoadMapFeature, feature_id)

    if feature is None:
        return False

    db.delete(feature)
    db.commit()

    return True