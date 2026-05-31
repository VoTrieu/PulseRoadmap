from typing import Literal
from app.schemas.pagination import PaginatedResponse
from pydantic import BaseModel

FeedbackSentiment = Literal["Positive", "Neutral", "Negative"]
CustomerTier = Literal["Enterprise", "Growth", "Startup"]
FeedbackUrgency = Literal["High", "Medium", "Low"]


class FeedbackCreate(BaseModel):
    customer: str
    request: str
    product_area: str
    sentiment: FeedbackSentiment
    tier: CustomerTier
    urgency: FeedbackUrgency
    source: str
    linked_feature: str
    received_at: str


class FeedbackUpdate(BaseModel):
    customer: str | None = None
    request: str | None = None
    product_area: str | None = None
    sentiment: FeedbackSentiment | None = None
    tier: CustomerTier | None = None
    urgency: FeedbackUrgency | None = None
    source: str | None = None
    linked_feature: str | None = None
    received_at: str | None = None


class FeedbackItem(BaseModel):
    id: str
    customer: str
    request: str
    product_area: str
    sentiment: FeedbackSentiment
    tier: CustomerTier
    urgency: FeedbackUrgency
    source: str
    linked_feature: str
    received_at: str
    # Allow converting SQLAlchemy model objects into API response objects.
    model_config = {"from_attributes": True}


FeedbackListResponse = PaginatedResponse[FeedbackItem]
