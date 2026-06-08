from types import SimpleNamespace
from unittest import TestCase

from app.data.repositories.ai_repository import AiProductContext
from app.schemas.ai import AiBriefRequest
from app.services.ai_brief_service import (
    build_assistant_context,
    generate_product_brief,
)


class AiBriefServiceTest(TestCase):
    def test_build_assistant_context_counts_product_signals(self) -> None:
        context = AiProductContext(
            feedback=[
                _record(product_area="Admin", urgency="High"),
                _record(product_area="Admin", urgency="Medium"),
                _record(product_area="Roadmap", urgency="High"),
            ],
            roadmap=[
                _record(priority="High"),
                _record(priority="Medium"),
            ],
            bugs=[
                _record(severity="Critical"),
                _record(severity="High"),
            ],
            releases=[
                _record(name="June launch", is_public=True),
                _record(name="Internal patch", is_public=False),
            ],
        )

        result = build_assistant_context(context)

        self.assertEqual(result.ai_provider, "local")
        self.assertEqual(result.total_feedback, 3)
        self.assertEqual(result.total_roadmap, 2)
        self.assertEqual(result.total_bugs, 2)
        self.assertEqual(result.total_releases, 2)
        self.assertEqual(result.high_urgency_feedback, 2)
        self.assertEqual(result.high_priority_roadmap, 1)
        self.assertEqual(result.critical_bugs, 1)
        self.assertEqual(result.public_releases, 1)
        self.assertEqual(result.top_feedback_area, "Admin")
        self.assertEqual(result.next_release, "June launch")

    def test_generate_product_brief_returns_four_english_sections(self) -> None:
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

        result = generate_product_brief(payload, context)

        self.assertEqual(result.title, "Generated product brief")
        self.assertEqual(len(result.sections), 4)
        self.assertEqual(result.sections[0].title, "Request")
        self.assertEqual(result.sections[0].body, payload.prompt)
        self.assertIn("Analytics", result.sections[1].body)
        self.assertIn("Revenue impact scoring", result.sections[2].body)
        self.assertIn("Analytics launch", result.sections[2].body)
        self.assertIn("1 critical bugs", result.sections[3].body)

    def test_generate_product_brief_handles_empty_context(self) -> None:
        context = AiProductContext(
            feedback=[],
            roadmap=[],
            bugs=[],
            releases=[],
        )
        payload = AiBriefRequest(prompt="Summarize product status", locale="en")

        result = generate_product_brief(payload, context)

        self.assertEqual(result.title, "Generated product brief")
        self.assertIn("None", result.sections[1].body)
        self.assertIn("None", result.sections[2].body)
        self.assertIn("0 critical bugs", result.sections[3].body)


def _record(**values: object) -> SimpleNamespace:
    return SimpleNamespace(**values)
