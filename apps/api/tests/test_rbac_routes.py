from types import SimpleNamespace
from unittest import TestCase
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.api.dependencies import (
    get_current_organization_id,
    get_current_organization_membership,
)
from app.data.db.session import get_db
from app.main import app


class RbacRoutesTest(TestCase):
    def setUp(self) -> None:
        app.dependency_overrides[get_db] = lambda: object()
        app.dependency_overrides[get_current_organization_id] = lambda: "org-test"
        self.client = TestClient(app)

    def tearDown(self) -> None:
        app.dependency_overrides.clear()

    def test_member_cannot_create_feedback(self) -> None:
        app.dependency_overrides[get_current_organization_membership] = lambda: _membership(
            "Member"
        )

        response = self.client.post("/api/feedback", json=_feedback_payload())

        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json()["detail"], "Insufficient organization permissions")

    def test_admin_can_create_feedback(self) -> None:
        app.dependency_overrides[get_current_organization_membership] = lambda: _membership(
            "Admin"
        )

        with patch(
            "app.api.routes.feedback.feedback_repository.create_feedback",
            return_value=_feedback_record(),
        ) as create_feedback:
            response = self.client.post("/api/feedback", json=_feedback_payload())

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["id"], "fb-test")
        create_feedback.assert_called_once()


def _membership(role: str) -> SimpleNamespace:
    return SimpleNamespace(
        organization_id="org-test",
        role=role,
    )


def _feedback_payload() -> dict[str, str]:
    return {
        "customer": "Northstar Health",
        "request": "Bulk workspace role updates",
        "product_area": "Admin",
        "sentiment": "Neutral",
        "tier": "Enterprise",
        "urgency": "High",
        "source": "Customer call",
        "linked_feature": "Workspace roles",
        "received_at": "Jun 12",
    }


def _feedback_record() -> SimpleNamespace:
    return SimpleNamespace(
        id="fb-test",
        **_feedback_payload(),
    )
