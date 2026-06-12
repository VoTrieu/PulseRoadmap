from types import SimpleNamespace
from unittest import TestCase
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.api.dependencies import get_current_user
from app.data.db.session import get_db
from app.main import app


class OrganizationsRoutesTest(TestCase):
    def setUp(self) -> None:
        app.dependency_overrides[get_current_user] = lambda: SimpleNamespace(
            id="user-test"
        )
        app.dependency_overrides[get_db] = lambda: object()
        self.client = TestClient(app)

    def tearDown(self) -> None:
        app.dependency_overrides.clear()

    def test_create_organization_returns_owner_membership(self) -> None:
        membership = SimpleNamespace(
            organization=SimpleNamespace(
                id="org-test",
                name="Northstar Health",
                slug="northstar-health-test",
            ),
            role="Owner",
        )

        with patch(
            "app.api.routes.organizations.auth_repository.create_organization_for_user",
            return_value=membership,
        ):
            response = self.client.post(
                "/api/organizations",
                json={"name": "Northstar Health"},
            )

        body = response.json()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(body["name"], "Northstar Health")
        self.assertEqual(body["role"], "Owner")
        self.assertEqual(body["id"], "org-test")

    def test_create_organization_requires_authentication(self) -> None:
        app.dependency_overrides.clear()
        response = self.client.post(
            "/api/organizations",
            json={"name": "Northstar Health"},
        )

        self.assertEqual(response.status_code, 401)
