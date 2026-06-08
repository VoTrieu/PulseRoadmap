from types import SimpleNamespace
from unittest import TestCase
from unittest.mock import patch

from app.data.repositories.ai_repository import AiProductContext
from app.schemas.ai import AiBriefRequest
from app.services.ai_providers import LocalAiBriefProvider, get_ai_brief_provider


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


def _record(**values: object) -> SimpleNamespace:
    return SimpleNamespace(**values)
