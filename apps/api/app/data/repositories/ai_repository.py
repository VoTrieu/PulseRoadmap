from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.data.models.bug import BugReport
from app.data.models.feedback import Feedback
from app.data.models.release import Release
from app.data.models.roadmap import RoadMapFeature

AI_CONTEXT_LIMIT = 100


@dataclass(frozen=True)
class AiProductContext:
    feedback: list[Feedback]
    roadmap: list[RoadMapFeature]
    bugs: list[BugReport]
    releases: list[Release]


def get_product_context(db: Session, organization_id: str) -> AiProductContext:
    return AiProductContext(
        feedback=_list_recent(db, Feedback, organization_id),
        roadmap=_list_recent(db, RoadMapFeature, organization_id),
        bugs=_list_recent(db, BugReport, organization_id),
        releases=_list_recent(db, Release, organization_id),
    )


def _list_recent[T](db: Session, model: type[T], organization_id: str) -> list[T]:
    statement = (
        select(model)
        .where(model.organization_id == organization_id)
        .order_by(model.created_at.desc(), model.id.desc())
        .limit(AI_CONTEXT_LIMIT)
    )

    return list(db.scalars(statement))
