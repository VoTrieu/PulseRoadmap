from app.data.repositories.ai_repository import AiProductContext
from app.schemas.ai import (
    AiAssistantContextResponse,
    AiBriefRequest,
    AiBriefResponse,
)
from app.services.ai_providers import AiBriefProvider, get_ai_brief_provider
from app.services.ai_utils import top_label


def generate_product_brief(
    payload: AiBriefRequest,
    context: AiProductContext,
    provider: AiBriefProvider | None = None,
) -> AiBriefResponse:
    brief_provider = provider or get_ai_brief_provider()
    return brief_provider.generate_brief(payload, context)


def build_assistant_context(
    context: AiProductContext,
) -> AiAssistantContextResponse:
    return AiAssistantContextResponse(
        total_feedback=len(context.feedback),
        total_roadmap=len(context.roadmap),
        total_bugs=len(context.bugs),
        total_releases=len(context.releases),
        high_urgency_feedback=len(
            [item for item in context.feedback if item.urgency == "High"]
        ),
        high_priority_roadmap=len(
            [feature for feature in context.roadmap if feature.priority == "High"]
        ),
        critical_bugs=len(
            [bug for bug in context.bugs if bug.severity == "Critical"]
        ),
        public_releases=len(
            [release for release in context.releases if release.is_public]
        ),
        top_feedback_area=top_label(
            context.feedback,
            lambda item: item.product_area,
        ),
        next_release=context.releases[0].name if context.releases else None,
    )
