from abc import ABC, abstractmethod

from app.core.config import settings
from app.data.repositories.ai_repository import AiProductContext
from app.schemas.ai import AiBriefRequest, AiBriefResponse, AiBriefSection
from app.services.ai_utils import top_label

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


class AiBriefProvider(ABC):
    @abstractmethod
    def generate_brief(
        self,
        payload: AiBriefRequest,
        context: AiProductContext,
    ) -> AiBriefResponse:
        pass


class LocalAiBriefProvider(AiBriefProvider):
    def generate_brief(
        self,
        payload: AiBriefRequest,
        context: AiProductContext,
    ) -> AiBriefResponse:
        text = TEXT[payload.locale]
        top_feedback_area = (
            top_label(context.feedback, lambda item: item.product_area)
            or text["none"]
        )
        top_roadmap_item = (
            context.roadmap[0].title if context.roadmap else text["none"]
        )
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


def get_ai_brief_provider() -> AiBriefProvider:
    provider_name = settings.ai_provider.strip().lower()

    if provider_name == "local":
        return LocalAiBriefProvider()

    raise ValueError(f"Unsupported AI provider: {settings.ai_provider}")
