from datetime import datetime

from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.data.db.base import Base


class Feedback(Base):
    __tablename__ = "feedback"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    customer: Mapped[str] = mapped_column(String(120), nullable=False)
    request: Mapped[str] = mapped_column(String(500), nullable=False)
    product_area: Mapped[str] = mapped_column(String(80), nullable=False)
    sentiment: Mapped[str] = mapped_column(String(20), nullable=False)
    tier: Mapped[str] = mapped_column(String(40), nullable=False)
    urgency: Mapped[str] = mapped_column(String(20), nullable=False)
    source: Mapped[str] = mapped_column(String(80), nullable=False)
    linked_feature: Mapped[str] = mapped_column(String(160), nullable=False)
    received_at: Mapped[str] = mapped_column(String(40), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
