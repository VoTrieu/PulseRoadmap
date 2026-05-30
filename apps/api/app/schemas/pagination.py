from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated response wrapper for any entity type."""
    items: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int
    
    class Config:
        arbitrary_types_allowed = True
