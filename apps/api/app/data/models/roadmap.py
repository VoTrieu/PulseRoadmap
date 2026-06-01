from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column
from app.data.db.base import Base

class RoadMapFeature(Base):
    __tablename__ = "roadmap_features"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    owner: Mapped[str] = mapped_column(String(120), nullable=False)
    milestone: Mapped[str] = mapped_column(String(120), nullable=True)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    priority: Mapped[str] = mapped_column(String(20), nullable=False)
    product_area: Mapped[str] = mapped_column(String(80), nullable=False)
    linked_feedback_count: Mapped[int] = mapped_column(Integer, nullable=False)
    revenue_impact: Mapped[int] = mapped_column(Integer, nullable=True)
    effort: Mapped[int] = mapped_column(Integer, nullable=True)
    strategic_value: Mapped[int] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )