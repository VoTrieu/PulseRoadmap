from types import SimpleNamespace
from unittest import TestCase
from unittest.mock import patch

from app.data.repositories.ai_repository import AiProductContext
from app.schemas.ai import AiBriefRequest
from app.services.ai_providers import (
    LocalAiBriefProvider,
    OpenAiBriefProvider,
    get_ai_brief_provider,
)


class LocalAiBriefProviderTest(TestCase):
    def test_generate_brief_returns_local_brief(self) -> None:
        provider = LocalAiBriefProvider()
        context = AiProductContext(
            feedback=[_record(product_area="Analytics")],
            roadmap=[_record(title="Revenue impact scoring")],
            bugs=[_record(severity="Critical")],
            releases=[_record(name="Analytics launch")],
        )
        payload = AiBriefRequest(
            prompt="Create an executive product brief",
            locale="en",
        )

        result = provider.generate_brief(payload, context)

        self.assertEqual(result.title, "Generated product brief")
        self.assertEqual(len(result.sections), 4)
        self.assertEqual(result.sections[0].body, payload.prompt)
        self.assertIn("Analytics", result.sections[1].body)
        self.assertIn("Revenue impact scoring", result.sections[2].body)
        self.assertIn("Analytics launch", result.sections[2].body)

    def test_get_ai_brief_provider_returns_local_provider(self) -> None:
        with patch("app.services.ai_providers.settings.ai_provider", "local"):
            result = get_ai_brief_provider()

        self.assertIsInstance(result, LocalAiBriefProvider)

    def test_get_ai_brief_provider_rejects_unknown_provider(self) -> None:
        with patch("app.services.ai_providers.settings.ai_provider", "unknown"):
            with self.assertRaises(ValueError):
                get_ai_brief_provider()

    def test_get_ai_brief_provider_returns_openai_provider(self) -> None:
        with (
            patch("app.services.ai_providers.settings.ai_provider", "openai"),
            patch("app.services.ai_providers.settings.openai_api_key", "test-key"),
        ):
            result = get_ai_brief_provider()

        self.assertIsInstance(result, OpenAiBriefProvider)

    def test_get_ai_brief_provider_requires_openai_api_key(self) -> None:
        with (
            patch("app.services.ai_providers.settings.ai_provider", "openai"),
            patch("app.services.ai_providers.settings.openai_api_key", ""),
        ):
            with self.assertRaises(ValueError):
                get_ai_brief_provider()

    def test_openai_provider_generates_brief_from_structured_output(self) -> None:
        provider = OpenAiBriefProvider(
            api_key="test-key",
            base_url="https://api.openai.test/v1",
            model="gpt-test",
        )
        context = AiProductContext(
            feedback=[
                _record(
                    customer="Northstar Health",
                    request="Improve role permissions",
                    product_area="Admin",
                    sentiment="Neutral",
                    tier="Enterprise",
                    urgency="High",
                    source="Customer call",
                    linked_feature="Role permissions",
                )
            ],
            roadmap=[
                _record(
                    title="Role permissions",
                    description="Workspace role controls",
                    owner="Maya Chen",
                    milestone="Q2 Platform",
                    status="In progress",
                    priority="High",
                    product_area="Admin",
                    linked_feedback_count=12,
                )
            ],
            bugs=[
                _record(
                    title="Role save error",
                    customer="Northstar Health",
                    product_area="Admin",
                    severity="Critical",
                    status="Open",
                    assignee="Platform team",
                    linked_release="Workspace roles",
                )
            ],
            releases=[
                _record(
                    name="Workspace roles",
                    version="2026.06.0",
                    status="QA",
                    release_type="Minor",
                    owner="Maya Chen",
                    target_date="Jun 20",
                    summary="Role control improvements",
                    is_public=True,
                )
            ],
        )
        payload = AiBriefRequest(prompt="Create a brief", locale="en")

        with patch("app.services.ai_providers.httpx.post") as post:
            post.return_value.json.return_value = {
                "output_text": (
                    '{"title":"AI generated brief","sections":'
                    '[{"title":"Summary","body":"Admin roles are the priority."}]}'
                )
            }
            post.return_value.raise_for_status.return_value = None

            result = provider.generate_brief(payload, context)

        self.assertEqual(result.title, "AI generated brief")
        self.assertEqual(result.sections[0].title, "Summary")
        post.assert_called_once()
        request_payload = post.call_args.kwargs["json"]
        self.assertEqual(request_payload["model"], "gpt-test")
        self.assertEqual(request_payload["text"]["format"]["type"], "json_schema")


def _record(**values: object) -> SimpleNamespace:
    return SimpleNamespace(**values)
