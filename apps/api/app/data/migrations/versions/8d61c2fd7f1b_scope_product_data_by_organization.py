"""scope product data by organization

Revision ID: 8d61c2fd7f1b
Revises: 2f0f7d05a9c3
Create Date: 2026-06-09 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "8d61c2fd7f1b"
down_revision: Union[str, Sequence[str], None] = "2f0f7d05a9c3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

demo_organization_id = "org-demo"


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        """
        INSERT INTO organizations (id, name, slug)
        VALUES ('org-demo', 'Acme Cloud', 'acme-cloud')
        ON CONFLICT (id) DO NOTHING
        """
    )

    for table_name in (
        "feedback",
        "roadmap_features",
        "bug_reports",
        "releases",
    ):
        op.add_column(
            table_name,
            sa.Column("organization_id", sa.String(length=40), nullable=True),
        )
        op.execute(
            sa.text(
                f"UPDATE {table_name} SET organization_id = :organization_id "
                "WHERE organization_id IS NULL"
            ).bindparams(organization_id=demo_organization_id)
        )
        op.alter_column(table_name, "organization_id", nullable=False)
        op.create_foreign_key(
            f"fk_{table_name}_organization_id_organizations",
            table_name,
            "organizations",
            ["organization_id"],
            ["id"],
            ondelete="CASCADE",
        )


def downgrade() -> None:
    """Downgrade schema."""
    for table_name in (
        "releases",
        "bug_reports",
        "roadmap_features",
        "feedback",
    ):
        op.drop_constraint(
            f"fk_{table_name}_organization_id_organizations",
            table_name,
            type_="foreignkey",
        )
        op.drop_column(table_name, "organization_id")
