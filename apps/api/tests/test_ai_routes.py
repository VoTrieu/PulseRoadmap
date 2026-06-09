from types import SimpleNamespace
from unittest import TestCase
from unittest.mock import patch

from fastapi.testclient import TestClient

from app.api.dependencies import get_current_organization_id
from app.data.repositories.ai_repository import AiProductContext
from app.main import app


class AiRoutesTest(TestCase):
    def setUp(self) -> None:
        app.dependency_overrides[get_current_organization_id] = lambda: "org-test"
        self.client = TestClient(app)

    def tearDown(self) -> None:
        app.dependency_overrides.clear()

    def test_get_ai_context_returns_assistant_context(self) -> None:
        with (
            patch(
                "app.api.routes.ai.ai_repository.get_product_context",
                return_value=_context(),
            ),
            patch("app.services.ai_brief_service.settings.ai_provider", "local"),
        ):
            response = self.client.get("/api/ai/context")

        body = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(body["ai_provider"], "local")
        self.assertEqual(body["total_feedback"], 2)
        self.assertEqual(body["total_roadmap"], 1)
        self.assertEqual(body["total_bugs"], 1)
        self.assertEqual(body["total_releases"], 1)
        self.assertEqual(body["top_feedback_area"], "Admin")
        self.assertEqual(body["next_release"], "Workspace roles")

    def test_post_ai_brief_returns_generated_brief(self) -> None:
        with (
            patch(
                "app.api.routes.ai.ai_repository.get_product_context",
                return_value=_context(),
            ),
            patch("app.services.ai_providers.settings.ai_provider", "local"),
        ):
            response = self.client.post(
                "/api/ai/brief",
                json={
                    "locale": "en",
                    "prompt": "Create an executive product brief",
                },
            )

        body = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(body["title"], "Generated product brief")
        self.assertEqual(len(body["sections"]), 4)
        self.assertEqual(body["sections"][0]["body"], "Create an executive product brief")

    def test_post_ai_brief_validates_prompt(self) -> None:
        response = self.client.post(
            "/api/ai/brief",
            json={"locale": "en", "prompt": ""},
        )

        self.assertEqual(response.status_code, 422)

    def test_post_ai_brief_returns_provider_configuration_error(self) -> None:
        with (
            patch(
                "app.api.routes.ai.ai_repository.get_product_context",
                return_value=_context(),
            ),
            patch("app.services.ai_providers.settings.ai_provider", "unknown"),
        ):
            response = self.client.post(
                "/api/ai/brief",
                json={
                    "locale": "en",
                    "prompt": "Create an executive product brief",
                },
            )

        body = response.json()

        self.assertEqual(response.status_code, 503)
        self.assertEqual(body["detail"], "Unsupported AI provider: unknown")

    def test_post_ai_brief_returns_missing_openai_key_error(self) -> None:
        with (
            patch(
                "app.api.routes.ai.ai_repository.get_product_context",
                return_value=_context(),
            ),
            patch("app.services.ai_providers.settings.ai_provider", "openai"),
            patch("app.services.ai_providers.settings.openai_api_key", ""),
        ):
            response = self.client.post(
                "/api/ai/brief",
                json={
                    "locale": "en",
                    "prompt": "Create an executive product brief",
                },
            )

        body = response.json()

        self.assertEqual(response.status_code, 503)
        self.assertEqual(
            body["detail"],
            "OpenAI API key is required when AI provider is openai",
        )


def _context() -> AiProductContext:
    return AiProductContext(
        feedback=[
            _record(product_area="Admin", urgency="High"),
            _record(product_area="Admin", urgency="Medium"),
        ],
        roadmap=[_record(title="Role permissions", priority="High")],
        bugs=[_record(severity="Critical")],
        releases=[_record(name="Workspace roles", is_public=True)],
    )


def _record(**values: object) -> SimpleNamespace:
    return SimpleNamespace(**values)
