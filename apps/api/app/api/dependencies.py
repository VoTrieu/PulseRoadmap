from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt.exceptions import InvalidTokenError
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.data.db.session import get_db
from app.data.models.auth import User
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
