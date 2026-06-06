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
