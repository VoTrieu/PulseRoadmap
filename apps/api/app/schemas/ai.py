from typing import Literal

from pydantic import BaseModel, Field


AiLocale = Literal["en", "fr"]


class AiBriefRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=2000)
    locale: AiLocale = "en"


class AiBriefSection(BaseModel):
    title: str
    body: str


class AiBriefResponse(BaseModel):
    title: str
    sections: list[AiBriefSection]


class AiAssistantContextResponse(BaseModel):
    total_feedback: int
    total_roadmap: int
    total_bugs: int
    total_releases: int
    high_urgency_feedback: int
    high_priority_roadmap: int
    critical_bugs: int
    public_releases: int
    top_feedback_area: str | None
    next_release: str | None
