from typing import Literal

from pydantic import BaseModel, EmailStr, Field

OrganizationRole = Literal["Owner", "Admin", "Member"]


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=1, max_length=120)
    password: str = Field(min_length=8, max_length=128)
    organization_name: str = Field(min_length=1, max_length=160)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class OrganizationSummary(BaseModel):
    id: str
    name: str
    slug: str
    role: OrganizationRole


class CurrentUserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    organizations: list[OrganizationSummary]

    model_config = {"from_attributes": True}
