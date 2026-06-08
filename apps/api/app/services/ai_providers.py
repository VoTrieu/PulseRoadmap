from abc import ABC, abstractmethod
import json
from typing import Any

import httpx
from pydantic import ValidationError

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


class OpenAiBriefProvider(AiBriefProvider):
    def __init__(
        self,
        api_key: str,
        base_url: str,
        model: str,
    ) -> None:
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.model = model

    def generate_brief(
        self,
        payload: AiBriefRequest,
        context: AiProductContext,
    ) -> AiBriefResponse:
        try:
            response = httpx.post(
                f"{self.base_url}/responses",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.model,
                    "instructions": _build_openai_instructions(payload.locale),
                    "input": _build_openai_input(payload, context),
                    "text": {"format": OPENAI_BRIEF_FORMAT},
                },
                timeout=30,
            )
            response.raise_for_status()
            return _parse_openai_brief(response.json())
        except (httpx.HTTPError, KeyError, TypeError, json.JSONDecodeError, ValidationError) as error:
            raise ValueError("OpenAI brief generation failed") from error


def get_ai_brief_provider() -> AiBriefProvider:
    provider_name = settings.ai_provider.strip().lower()

    if provider_name == "local":
        return LocalAiBriefProvider()

    if provider_name == "openai":
        if not settings.openai_api_key:
            raise ValueError("OpenAI API key is required when AI provider is openai")

        return OpenAiBriefProvider(
            api_key=settings.openai_api_key,
            base_url=settings.openai_base_url,
            model=settings.openai_model,
        )

    raise ValueError(f"Unsupported AI provider: {settings.ai_provider}")


OPENAI_BRIEF_FORMAT: dict[str, Any] = {
    "type": "json_schema",
    "name": "product_brief",
    "strict": True,
    "schema": {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "title": {"type": "string"},
            "sections": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "title": {"type": "string"},
                        "body": {"type": "string"},
                    },
                    "required": ["title", "body"],
                },
            },
        },
        "required": ["title", "sections"],
    },
}


def _build_openai_instructions(locale: str) -> str:
    language = "French" if locale == "fr" else "English"

    return (
        "You are an AI product operations assistant for a B2B SaaS product team. "
        f"Generate a concise product brief in {language}. "
        "Use the supplied product context only. Return JSON that matches the schema."
    )


def _build_openai_input(
    payload: AiBriefRequest,
    context: AiProductContext,
) -> str:
    context_payload = {
        "prompt": payload.prompt.strip(),
        "feedback": [
            {
                "customer": item.customer,
                "request": item.request,
                "product_area": item.product_area,
                "sentiment": item.sentiment,
                "tier": item.tier,
                "urgency": item.urgency,
                "source": item.source,
                "linked_feature": item.linked_feature,
            }
            for item in context.feedback[:20]
        ],
        "roadmap": [
            {
                "title": item.title,
                "description": item.description,
                "owner": item.owner,
                "milestone": item.milestone,
                "status": item.status,
                "priority": item.priority,
                "product_area": item.product_area,
                "linked_feedback_count": item.linked_feedback_count,
            }
            for item in context.roadmap[:20]
        ],
        "bugs": [
            {
                "title": item.title,
                "customer": item.customer,
                "product_area": item.product_area,
                "severity": item.severity,
                "status": item.status,
                "assignee": item.assignee,
                "linked_release": item.linked_release,
            }
            for item in context.bugs[:20]
        ],
        "releases": [
            {
                "name": item.name,
                "version": item.version,
                "status": item.status,
                "release_type": item.release_type,
                "owner": item.owner,
                "target_date": item.target_date,
                "summary": item.summary,
                "is_public": item.is_public,
            }
            for item in context.releases[:20]
        ],
    }

    return json.dumps(context_payload)


def _parse_openai_brief(response: dict[str, Any]) -> AiBriefResponse:
    output_text = _extract_output_text(response)
    return AiBriefResponse.model_validate(json.loads(output_text))


def _extract_output_text(response: dict[str, Any]) -> str:
    if isinstance(response.get("output_text"), str):
        return response["output_text"]

    for output_item in response.get("output", []):
        for content_item in output_item.get("content", []):
            if isinstance(content_item.get("text"), str):
                return content_item["text"]

    raise KeyError("output_text")
