from typing import Literal

from pydantic import BaseModel


class FeedbackCreate(BaseModel):
    customer: str
    request: str
    product_area: str
    sentiment: Literal["Positive", "Neutral", "Negative"]
    tier: Literal["Enterprise", "Growth", "Startup"]
    urgency: Literal["High", "Medium", "Low"]
    source: str
    linked_feature: str
    received_at: str


class FeedbackItem(BaseModel):
    id: str
    customer: str
    request: str
    product_area: str
    sentiment: Literal["Positive", "Neutral", "Negative"]
    tier: Literal["Enterprise", "Growth", "Startup"]
    urgency: Literal["High", "Medium", "Low"]
    source: str
    linked_feature: str
    received_at: str
    #Allow converting SQLAlchemy model objects into API response objects.
    model_config = {"from_attributes": True}
