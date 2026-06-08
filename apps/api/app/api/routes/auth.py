from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.security import create_access_token, verify_password
from app.data.db.session import get_db
from app.data.models.auth import User
from app.data.repositories import auth_repository
from app.schemas.auth import (
    CurrentUserResponse,
    OrganizationSummary,
    TokenResponse,
    UserCreate,
    UserLogin,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)) -> TokenResponse:
    existing_user = auth_repository.get_user_by_email(db, payload.email)

    if existing_user is not None:
        raise HTTPException(status_code=409, detail="Email already exists")

    user = auth_repository.create_user_with_organization(db, payload)

    return TokenResponse(access_token=create_access_token(user.id))


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> TokenResponse:
    user = auth_repository.get_user_by_email(db, payload.email)

    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return TokenResponse(access_token=create_access_token(user.id))


@router.get("/me", response_model=CurrentUserResponse)
def get_me(current_user: User = Depends(get_current_user)) -> CurrentUserResponse:
    return CurrentUserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        organizations=[
            OrganizationSummary(
                id=membership.organization.id,
                name=membership.organization.name,
                slug=membership.organization.slug,
                role=membership.role,
            )
            for membership in current_user.memberships
        ],
    )
