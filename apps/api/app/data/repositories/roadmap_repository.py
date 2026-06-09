from uuid import uuid4

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.data.models.roadmap import RoadMapFeature
from app.schemas.roadmap import RoadmapFeatureCreate, RoadmapFeatureUpdate


def list_features(
    db: Session,
    organization_id: str,
    search: str | None = None,
    status: str | None = None,
    priority: str | None = None,
    product_area: str | None = None,
    skip: int = 0,
    take: int = 10,
) -> tuple[list[RoadMapFeature], int]:
    statement = select(RoadMapFeature).where(
        RoadMapFeature.organization_id == organization_id
    )
    search_value = search.strip() if search else None

    if search_value:
        pattern = f"%{search_value}%"
        statement = statement.where(
            or_(
                RoadMapFeature.title.ilike(pattern),
                RoadMapFeature.owner.ilike(pattern),
                RoadMapFeature.milestone.ilike(pattern),
                RoadMapFeature.description.ilike(pattern),
            )
        )

    if status:
        statement = statement.where(RoadMapFeature.status == status)

    if priority:
        statement = statement.where(RoadMapFeature.priority == priority)

    if product_area:
        statement = statement.where(RoadMapFeature.product_area == product_area)

    count_stmt = select(func.count()).select_from(statement.subquery())
    total_count = db.scalar(count_stmt) or 0

    data_stmt = (
        statement.order_by(
            RoadMapFeature.created_at.desc(),
            RoadMapFeature.id.desc(),
        )
        .offset(skip)
        .limit(take)
    )

    return list(db.scalars(data_stmt)), total_count


def get_feature_by_id(
    db: Session, organization_id: str, feature_id: str
) -> RoadMapFeature | None:
    statement = select(RoadMapFeature).where(
        RoadMapFeature.id == feature_id,
        RoadMapFeature.organization_id == organization_id,
    )

    return db.scalar(statement)


def create_feature(
    db: Session, organization_id: str, payload: RoadmapFeatureCreate
) -> RoadMapFeature:
    feature = RoadMapFeature(
        id=f"rf-{uuid4().hex[:8]}",
        organization_id=organization_id,
        **payload.model_dump(),
    )

    db.add(feature)
    db.commit()
    db.refresh(feature)

    return feature


def update_feature(
    db: Session, organization_id: str, feature_id: str, payload: RoadmapFeatureUpdate
) -> RoadMapFeature | None:
    feature = get_feature_by_id(db, organization_id, feature_id)

    if feature is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(feature, key, value)

    db.commit()
    db.refresh(feature)

    return feature


def delete_feature(db: Session, organization_id: str, feature_id: str) -> bool:
    feature = get_feature_by_id(db, organization_id, feature_id)

    if feature is None:
        return False

    db.delete(feature)
    db.commit()

    return True
