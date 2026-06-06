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


def get_product_context(db: Session) -> AiProductContext:
    return AiProductContext(
        feedback=_list_recent(db, Feedback),
        roadmap=_list_recent(db, RoadMapFeature),
        bugs=_list_recent(db, BugReport),
        releases=_list_recent(db, Release),
    )


def _list_recent[T](db: Session, model: type[T]) -> list[T]:
    statement = (
        select(model)
        .order_by(model.created_at.desc(), model.id.desc())
        .limit(AI_CONTEXT_LIMIT)
    )

    return list(db.scalars(statement))
