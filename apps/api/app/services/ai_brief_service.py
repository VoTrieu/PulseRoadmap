from collections.abc import Callable

from app.data.repositories.ai_repository import AiProductContext
from app.schemas.ai import (
    AiAssistantContextResponse,
    AiBriefRequest,
    AiBriefResponse,
    AiBriefSection,
)

Translations = dict[str, str]

TEXT: dict[str, Translations] = {
    "en": {
        "none": "None",
        "title": "Generated product brief",
        "request": "Request",
        "customer_signals": "Customer signals",
        "delivery_plan": "Delivery plan",
        "risks": "Risks",
        "customer_body": (
            "There are {count} feedback items in context. The strongest visible "
            "product area is {area}, so prioritization should start there."
        ),
        "delivery_body": (
            "The leading roadmap item is {feature}. Connect it to {release} so "
            "the team can align scope, QA, and changelog timing."
        ),
        "risk_body": (
            "There are {count} critical bugs in context. Keep these visible before "
            "committing launch dates or public messaging."
        ),
    },
    "fr": {
        "none": "Aucun",
        "title": "Brief produit genere",
        "request": "Demande",
        "customer_signals": "Signaux clients",
        "delivery_plan": "Plan de livraison",
        "risks": "Risques",
        "customer_body": (
            "Il y a {count} retours dans le contexte. La zone produit la plus "
            "visible est {area}, donc la priorisation devrait commencer la."
        ),
        "delivery_body": (
            "L'element roadmap principal est {feature}. Reliez-le a {release} "
            "pour aligner le scope, la QA et le calendrier du changelog."
        ),
        "risk_body": (
            "Il y a {count} bugs critiques dans le contexte. Gardez-les visibles "
            "avant de confirmer les dates de lancement ou les messages publics."
        ),
    },
}


def generate_product_brief(
    payload: AiBriefRequest,
    context: AiProductContext,
) -> AiBriefResponse:
    text = TEXT[payload.locale]
    top_feedback_area = (
        _top_label(context.feedback, lambda item: item.product_area) or text["none"]
    )
    top_roadmap_item = context.roadmap[0].title if context.roadmap else text["none"]
    next_release = context.releases[0].name if context.releases else text["none"]
    critical_bug_count = len(
        [bug for bug in context.bugs if bug.severity == "Critical"]
    )

    return AiBriefResponse(
        title=text["title"],
        sections=[
            AiBriefSection(title=text["request"], body=payload.prompt.strip()),
            AiBriefSection(
                title=text["customer_signals"],
                body=text["customer_body"].format(
                    count=len(context.feedback),
                    area=top_feedback_area,
                ),
            ),
            AiBriefSection(
                title=text["delivery_plan"],
                body=text["delivery_body"].format(
                    feature=top_roadmap_item,
                    release=next_release,
                ),
            ),
            AiBriefSection(
                title=text["risks"],
                body=text["risk_body"].format(count=critical_bug_count),
            ),
        ],
    )


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
        top_feedback_area=_top_label(
            context.feedback,
            lambda item: item.product_area,
        ),
        next_release=context.releases[0].name if context.releases else None,
    )


def _top_label[T](items: list[T], get_label: Callable[[T], str]) -> str | None:
    counts: dict[str, int] = {}

    for item in items:
        label = get_label(item)
        counts[label] = counts.get(label, 0) + 1

    if not counts:
        return None

    return sorted(counts.items(), key=lambda item: (-item[1], item[0]))[0][0]
