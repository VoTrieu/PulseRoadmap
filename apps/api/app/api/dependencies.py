from fastapi import Depends, Header, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.data.db.session import get_db
from app.data.models.auth import OrganizationMember, User
from app.data.repositories import auth_repository

OrganizationRole = str

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    unauthorized_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise unauthorized_error

    try:
        payload = decode_access_token(credentials.credentials)
    except InvalidTokenError as error:
        raise unauthorized_error from error

    user_id = payload.get("sub")

    if not isinstance(user_id, str):
        raise unauthorized_error

    user = auth_repository.get_user_by_id(db, user_id)

    if user is None:
        raise unauthorized_error

    return user


def get_current_organization_membership(
    current_user: User = Depends(get_current_user),
    requested_organization_id: str | None = Header(
        default=None,
        alias="X-Organization-Id",
    ),
) -> OrganizationMember:
    if requested_organization_id is not None:
        membership = next(
            (
                membership
                for membership in current_user.memberships
                if membership.organization_id == requested_organization_id
            ),
            None,
        )

        if membership is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User does not belong to the requested organization",
            )

        return membership

    membership = next(iter(current_user.memberships), None)

    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not belong to an organization",
        )

    return membership


def get_current_organization_id(
    membership: OrganizationMember = Depends(get_current_organization_membership),
) -> str:
    return membership.organization_id


def require_organization_roles(*allowed_roles: OrganizationRole):
    def dependency(
        membership: OrganizationMember = Depends(get_current_organization_membership),
    ) -> OrganizationMember:
        if membership.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient organization permissions",
            )

        return membership

    return dependency
