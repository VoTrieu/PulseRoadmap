from sqlalchemy import select
from sqlalchemy.orm import Session

from app.data.db.session import engine
from app.data.bug_sample_data import bug_reports
from app.data.feedback_sample_data import feedback_items
from app.data.models.bug import BugReport
from app.data.models.feedback import Feedback

def seed_feedbacks(db: Session) -> None:
    has_feedback = db.scalar(select(Feedback.id).limit(1))
    
    if has_feedback:
        return
    
    db.add_all(
        Feedback(**feedback.model_dump()) for feedback in feedback_items
    )
    db.commit()

def seed_bugs(db: Session) -> None:
    has_bug = db.scalar(select(BugReport.id).limit(1))

    if has_bug:
        return

    db.add_all(bug_reports)
    db.commit()

def init_db() -> None:
    with Session(engine) as db:
        seed_feedbacks(db)
        seed_bugs(db)
