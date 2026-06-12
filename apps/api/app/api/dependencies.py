from fastapi import Depends, Header, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.data.db.session import get_db
from app.data.models.auth import OrganizationMember, User
from app.data.repositories import auth_repository

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


def get_current_organization_id(
    current_user: User = Depends(get_current_user),
    requested_organization_id: str | None = Header(
        default=None,
        alias="X-Organization-Id",
    ),
) -> str:
    if requested_organization_id is not None:
        has_membership = any(
            membership.organization_id == requested_organization_id
            for membership in current_user.memberships
        )

        if not has_membership:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User does not belong to the requested organization",
            )

        return requested_organization_id

    membership: OrganizationMember | None = next(
        iter(current_user.memberships),
        None,
    )

    if membership is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User does not belong to an organization",
        )

    return membership.organization_id
