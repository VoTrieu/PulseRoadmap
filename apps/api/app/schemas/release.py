from typing import Literal

from pydantic import BaseModel

from app.schemas.pagination import PaginatedResponse


ReleaseStatus = Literal["Planned", "QA", "Staged", "Shipped", "Canceled"]
ReleaseType = Literal["Major", "Minor", "Patch", "Hotfix"]


class ReleaseCreate(BaseModel):
    name: str
    version: str
    status: ReleaseStatus
    release_type: ReleaseType
    owner: str
    target_date: str
    shipped_at: str | None = None
    summary: str
    internal_notes: str
    public_notes: str
    included_feature_ids: list[str]
    included_bug_ids: list[str]
    is_public: bool


class ReleaseUpdate(BaseModel):
    name: str | None = None
    version: str | None = None
    status: ReleaseStatus | None = None
    release_type: ReleaseType | None = None
    owner: str | None = None
    target_date: str | None = None
    shipped_at: str | None = None
    summary: str | None = None
    internal_notes: str | None = None
    public_notes: str | None = None
    included_feature_ids: list[str] | None = None
    included_bug_ids: list[str] | None = None
    is_public: bool | None = None


class ReleaseItem(BaseModel):
    id: str
    name: str
    version: str
    status: ReleaseStatus
    release_type: ReleaseType
    owner: str
    target_date: str
    shipped_at: str | None
    summary: str
    internal_notes: str
    public_notes: str
    included_feature_ids: list[str]
    included_bug_ids: list[str]
    is_public: bool

    model_config = {"from_attributes": True}


ReleaseListResponse = PaginatedResponse[ReleaseItem]