from uuid import uuid4

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.data.models.bug import BugReport
from app.schemas.bug import BugReportCreate, BugReportUpdate


def list_bugs(
    db: Session,
    search: str | None = None,
    severity: str | None = None,
    status: str | None = None,
    product_area: str | None = None,
    skip: int = 0,
    take: int = 10,
) -> tuple[list[BugReport], int]:
    statement = select(BugReport)
    search_value = search.strip() if search else None

    if search_value:
        pattern = f"%{search_value}%"
        statement = statement.where(
            or_(
                BugReport.title.ilike(pattern),
                BugReport.customer.ilike(pattern),
                BugReport.assignee.ilike(pattern),
                BugReport.source.ilike(pattern),
            )
        )

    if severity:
        statement = statement.where(BugReport.severity == severity)

    if status:
        statement = statement.where(BugReport.status == status)

    if product_area:
        statement = statement.where(BugReport.product_area == product_area)

    count_stmt = select(func.count()).select_from(statement.subquery())
    total_count = db.scalar(count_stmt) or 0

    data_stmt = (
        statement.order_by(
            BugReport.created_at.desc(),
            BugReport.id.desc(),
        )
        .offset(skip)
        .limit(take)
    )

    return list(db.scalars(data_stmt)), total_count


def get_bug_by_id(db: Session, bug_id: str) -> BugReport | None:
    return db.get(BugReport, bug_id)


def create_bug(db: Session, payload: BugReportCreate) -> BugReport:
    bug = BugReport(
        id=f"bug-{uuid4().hex[:8]}",
        **payload.model_dump(),
    )

    db.add(bug)
    db.commit()
    db.refresh(bug)

    return bug


def update_bug(
    db: Session, bug_id: str, payload: BugReportUpdate
) -> BugReport | None:
    bug = db.get(BugReport, bug_id)

    if bug is None:
        return None

    updates = payload.model_dump(exclude_unset=True)

    for key, value in updates.items():
        setattr(bug, key, value)

    db.commit()
    db.refresh(bug)

    return bug


def delete_bug(db: Session, bug_id: str) -> bool:
    bug = db.get(BugReport, bug_id)

    if bug is None:
        return False

    db.delete(bug)
    db.commit()

    return True
