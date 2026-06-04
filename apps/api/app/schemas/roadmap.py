
from typing import Literal
from pydantic import BaseModel

from app.schemas.pagination import PaginatedResponse

RoadmapStatus = Literal["Discovery", "Planned", "In progress", "Shipped"]
RoadmapPriority = Literal["High", "Medium", "Low"]

class RoadmapFeatureCreate(BaseModel):
    title: str
    description: str
    owner: str
    milestone: str
    status: RoadmapStatus
    priority: RoadmapPriority
    product_area: str
    linked_feedback_count: int
    revenue_impact: int
    effort: int
    strategic_value: int
    
class RoadmapFeatureUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    owner: str | None = None
    milestone: str | None = None
    status: RoadmapStatus | None = None
    priority: RoadmapPriority | None = None
    product_area: str | None = None
    linked_feedback_count: int | None = None
    revenue_impact: int | None = None
    effort: int | None = None
    strategic_value: int | None = None
    
class RoadmapFeatureItem(BaseModel):
    id: str
    title: str
    description: str
    owner: str
    milestone: str
    status: RoadmapStatus
    priority: RoadmapPriority
    product_area: str
    linked_feedback_count: int
    revenue_impact: int
    effort: int
    strategic_value: int
    
    # Allow converting SQLAlchemy model objects into API response objects.
    model_config = {"from_attributes": True}
    
RoadmapFeatureListResponse = PaginatedResponse[RoadmapFeatureItem]