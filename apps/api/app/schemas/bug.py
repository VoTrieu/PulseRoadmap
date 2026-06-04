from typing import Literal

from pydantic import BaseModel

from app.schemas.pagination import PaginatedResponse

BugSeverity = Literal["Critical", "High", "Medium", "Low"]
BugStatus = Literal["New", "Triaging", "In progress", "Fixed", "Closed"]


class BugReportCreate(BaseModel):
    title: str
    customer: str
    product_area: str
    severity: BugSeverity
    status: BugStatus
    assignee: str
    source: str
    reproduction_steps: str
    linked_release: str
    reported_at: str


class BugReportUpdate(BaseModel):
    title: str | None = None
    customer: str | None = None
    product_area: str | None = None
    severity: BugSeverity | None = None
    status: BugStatus | None = None
    assignee: str | None = None
    source: str | None = None
    reproduction_steps: str | None = None
    linked_release: str | None = None
    reported_at: str | None = None


class BugReportItem(BaseModel):
    id: str
    title: str
    customer: str
    product_area: str
    severity: BugSeverity
    status: BugStatus
    assignee: str
    source: str
    reproduction_steps: str
    linked_release: str
    reported_at: str

    model_config = {"from_attributes": True}


BugReportListResponse = PaginatedResponse[BugReportItem]
