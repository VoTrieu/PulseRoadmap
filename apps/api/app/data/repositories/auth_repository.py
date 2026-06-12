from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.security import hash_password
from app.data.models.auth import Organization, OrganizationMember, User
from app.schemas.auth import OrganizationCreate, UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email.lower())

    return db.scalar(statement)


def get_user_by_id(db: Session, user_id: str) -> User | None:
    statement = (
        select(User)
        .where(User.id == user_id)
        .options(
            selectinload(User.memberships).selectinload(
                OrganizationMember.organization
            )
        )
    )

    return db.scalar(statement)


def create_user_with_organization(db: Session, payload: UserCreate) -> User:
    user = User(
        id=f"user-{uuid4().hex[:12]}",
        email=payload.email.lower(),
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
    )
    organization = Organization(
        id=f"org-{uuid4().hex[:12]}",
        name=payload.organization_name,
        slug=_create_slug(payload.organization_name),
    )
    membership = OrganizationMember(
        id=f"mem-{uuid4().hex[:12]}",
        organization=organization,
        user=user,
        role="Owner",
    )

    db.add_all([user, organization, membership])
    db.commit()
    db.refresh(user)

    return user


def create_organization_for_user(
    db: Session, user: User, payload: OrganizationCreate
) -> OrganizationMember:
    organization = Organization(
        id=f"org-{uuid4().hex[:12]}",
        name=payload.name,
        slug=_create_slug(payload.name),
    )
    membership = OrganizationMember(
        id=f"mem-{uuid4().hex[:12]}",
        organization=organization,
        user_id=user.id,
        role="Owner",
    )

    db.add_all([organization, membership])
    db.commit()
    db.refresh(membership)

    return membership


def _create_slug(name: str) -> str:
    slug = name.strip().lower()
    slug = "".join(character if character.isalnum() else "-" for character in slug)
    slug = "-".join(part for part in slug.split("-") if part)

    if not slug:
        return f"org-{uuid4().hex[:8]}"

    return f"{slug}-{uuid4().hex[:6]}"
