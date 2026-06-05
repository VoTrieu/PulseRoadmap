from uuid import uuid4

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.data.models.release import Release
from app.schemas.release import ReleaseCreate, ReleaseUpdate


def list_releases(
    db: Session,
    search: str | None = None,
    status: str | None = None,
    release_type: str | None = None,
    is_public: bool | None = None,
    skip: int = 0,
    take: int = 10,
) -> tuple[list[Release], int]:
    statement = select(Release)
    search_value = search.strip() if search else None

    if search_value:
        pattern = f"%{search_value}%"
        statement = statement.where(
            or_(
                Release.name.ilike(pattern),
                Release.version.ilike(pattern),
                Release.owner.ilike(pattern),
                Release.summary.ilike(pattern),
            )
        )

    if status:
        statement = statement.where(Release.status == status)

    if release_type:
        statement = statement.where(Release.release_type == release_type)

    if is_public is not None:
        statement = statement.where(Release.is_public == is_public)

    count_stmt = select(func.count()).select_from(statement.subquery())
    total_count = db.scalar(count_stmt) or 0

    data_stmt = (
        statement.order_by(
            Release.created_at.desc(),
            Release.id.desc(),
        )
        .offset(skip)
        .limit(take)
    )

    return list(db.scalars(data_stmt)), total_count


def get_release_by_id(db: Session, release_id: str) -> Release | None:
    return db.get(Release, release_id)


def create_release(db: Session, payload: ReleaseCreate) -> Release:
    release = Release(
        id=f"rel-{uuid4().hex[:8]}",
        **payload.model_dump(),
    )

    db.add(release)
    db.commit()
    db.refresh(release)

    return release


def update_release(
    db: Session, release_id: str, payload: ReleaseUpdate
) -> Release | None:
    release = db.get(Release, release_id)

    if release is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(release, key, value)

    db.commit()
    db.refresh(release)

    return release


def delete_release(db: Session, release_id: str) -> bool:
    release = db.get(Release, release_id)

    if release is None:
        return False

    db.delete(release)
    db.commit()

    return True