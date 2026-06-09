from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.data.db.session import engine
from app.data.bug_sample_data import bug_reports
from app.data.feedback_sample_data import feedback_items
from app.data.release_sample_data import release_items
from app.data.models.auth import Organization, OrganizationMember, User
from app.data.models.bug import BugReport
from app.data.models.feedback import Feedback
from app.data.models.release import Release

DEMO_ORGANIZATION_ID = "org-demo"
DEMO_USER_ID = "user-demo"
DEMO_MEMBERSHIP_ID = "mem-demo"


def seed_demo_auth(db: Session) -> str:
    organization = db.get(Organization, DEMO_ORGANIZATION_ID)

    if organization is None:
        organization = Organization(
            id=DEMO_ORGANIZATION_ID,
            name="Acme Cloud",
            slug="acme-cloud",
        )
        db.add(organization)

    user = db.get(User, DEMO_USER_ID)

    if user is None:
        user = User(
            id=DEMO_USER_ID,
            email="demo@pulseroadmap.dev",
            full_name="Demo User",
            hashed_password=hash_password("password123"),
        )
        db.add(user)

    membership = db.get(OrganizationMember, DEMO_MEMBERSHIP_ID)

    if membership is None:
        db.add(
            OrganizationMember(
                id=DEMO_MEMBERSHIP_ID,
                organization_id=DEMO_ORGANIZATION_ID,
                user_id=DEMO_USER_ID,
                role="Owner",
            )
        )

    db.commit()

    return DEMO_ORGANIZATION_ID


def seed_feedbacks(db: Session, organization_id: str) -> None:
    has_feedback = db.scalar(select(Feedback.id).limit(1))
    
    if has_feedback:
        return
    
    db.add_all(
        Feedback(organization_id=organization_id, **feedback.model_dump())
        for feedback in feedback_items
    )
    db.commit()

def seed_bugs(db: Session, organization_id: str) -> None:
    has_bug = db.scalar(select(BugReport.id).limit(1))

    if has_bug:
        return

    for bug_report in bug_reports:
        bug_report.organization_id = organization_id

    db.add_all(bug_reports)
    db.commit()
    
def seed_releases(db: Session, organization_id: str) -> None:
    has_release = db.scalar(select(Release.id).limit(1))

    if has_release:
        return

    db.add_all(
        Release(organization_id=organization_id, **release.model_dump())
        for release in release_items
    )
    db.commit()

def init_db() -> None:
    with Session(engine) as db:
        organization_id = seed_demo_auth(db)
        seed_feedbacks(db, organization_id)
        seed_bugs(db, organization_id)
        seed_releases(db, organization_id)
