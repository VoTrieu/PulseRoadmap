import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiAssistantSummaryGrid } from "../../components/ai/AiAssistantSummaryGrid";
import { AiBriefPreview } from "../../components/ai/AiBriefPreview";
import { AiContextPanel } from "../../components/ai/AiContextPanel";
import { AiPromptPanel } from "../../components/ai/AiPromptPanel";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import type { TranslationKey } from "../../i18n/translations";
import {
  useAiAssistantContext,
  useGenerateAiBrief,
} from "../../queries/aiQueries";
import type {
  AiAssistantContext,
  AiAssistantMetric,
  AiBrief,
  AiContextItem,
  AiLocale,
  AiPromptPreset,
} from "../../types/aiAssistant";

function AiAssistantPage() {
  const { i18n, t } = useTranslation();
  const [prompt, setPrompt] = useState(t("aiAssistant.defaultPrompt"));
  const [brief, setBrief] = useState<AiBrief>({
    sections: [],
    title: t("aiAssistant.brief.defaultTitle"),
  });
  const generateBriefMutation = useGenerateAiBrief();
  const contextQuery = useAiAssistantContext();
  const context = contextQuery.data;
  const translate = (key: TranslationKey) => t(key);
  const summaries = useMemo(
    () => (context ? buildAiSummaries(context, translate) : []),
    [context, translate],
  );
  const contextItems = useMemo(
    () => (context ? buildContextItems(context, translate) : []),
    [context, translate],
  );
  const presets = useMemo(() => buildPromptPresets(translate), [translate]);

  function retryAll() {
    void contextQuery.refetch();
  }

  function generateBrief() {
    generateBriefMutation.mutate(
      {
        locale: getAiLocale(i18n.language),
        prompt: prompt.trim() || t("aiAssistant.defaultPrompt"),
      },
      { onSuccess: setBrief },
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t("aiAssistant.eyebrow")}
        subtitle={t("aiAssistant.page.subtitle")}
        title={t("aiAssistant.page.title")}
      />

      {contextQuery.isLoading ? (
        <LoadingState message={t("aiAssistant.loading")} />
      ) : contextQuery.isError ? (
        <ErrorState
          message={t("aiAssistant.listLoadErrorMessage")}
          onRetry={retryAll}
          title={t("aiAssistant.listLoadErrorTitle")}
        />
      ) : (
        <>
          <AiAssistantSummaryGrid summaries={summaries} />
          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)]">
            <div className="grid gap-4">
              <AiPromptPanel
                buttonLabel={t("aiAssistant.generate")}
                isSubmitting={generateBriefMutation.isPending}
                onPromptChange={setPrompt}
                onSubmit={generateBrief}
                placeholder={t("aiAssistant.promptPlaceholder")}
                presets={presets}
                prompt={prompt}
                title={t("aiAssistant.prompt.title")}
              />
              <AiBriefPreview
                brief={brief}
                emptyMessage={t("aiAssistant.brief.empty")}
                subTitle={t("aiAssistant.brief.subtitle")}
                title={t("aiAssistant.brief.title")}
              />
            </div>
            <AiContextPanel
              items={contextItems}
              subTitle={t("aiAssistant.context.subtitle")}
              title={t("aiAssistant.context.title")}
            />
          </section>
        </>
      )}
    </>
  );
}

function buildAiSummaries(
  context: AiAssistantContext,
  t: (key: TranslationKey) => string,
): AiAssistantMetric[] {
  return [
    {
      label: t("aiAssistant.summary.feedbackLabel"),
      value: String(context.highUrgencyFeedback),
      helper: t("aiAssistant.summary.feedbackHelper"),
      icon: "pi pi-inbox",
    },
    {
      label: t("aiAssistant.summary.roadmapLabel"),
      value: String(context.highPriorityRoadmap),
      helper: t("aiAssistant.summary.roadmapHelper"),
      icon: "pi pi-sitemap",
    },
    {
      label: t("aiAssistant.summary.bugsLabel"),
      value: String(context.criticalBugs),
      helper: t("aiAssistant.summary.bugsHelper"),
      icon: "pi pi-exclamation-triangle",
    },
    {
      label: t("aiAssistant.summary.releasesLabel"),
      value: String(context.publicReleases),
      helper: t("aiAssistant.summary.releasesHelper"),
      icon: "pi pi-send",
    },
  ];
}

function buildContextItems(
  context: AiAssistantContext,
  t: (key: TranslationKey) => string,
): AiContextItem[] {
  return [
    {
      label: t("aiAssistant.context.provider"),
      value: formatProviderName(context.aiProvider),
    },
    {
      label: t("aiAssistant.context.feedback"),
      value: String(context.totalFeedback),
    },
    {
      label: t("aiAssistant.context.roadmap"),
      value: String(context.totalRoadmap),
    },
    {
      label: t("aiAssistant.context.bugs"),
      value: String(context.totalBugs),
    },
    {
      label: t("aiAssistant.context.releases"),
      value: String(context.totalReleases),
    },
    {
      label: t("aiAssistant.context.topFeedbackArea"),
      value: context.topFeedbackArea ?? t("aiAssistant.none"),
    },
    {
      label: t("aiAssistant.context.nextRelease"),
      value: context.nextRelease ?? t("aiAssistant.none"),
    },
  ];
}

function buildPromptPresets(t: (key: TranslationKey) => string): AiPromptPreset[] {
  return [
    {
      description: t("aiAssistant.presets.executive.description"),
      icon: "pi pi-briefcase",
      label: t("aiAssistant.presets.executive.label"),
      prompt: t("aiAssistant.presets.executive.prompt"),
    },
    {
      description: t("aiAssistant.presets.release.description"),
      icon: "pi pi-send",
      label: t("aiAssistant.presets.release.label"),
      prompt: t("aiAssistant.presets.release.prompt"),
    },
    {
      description: t("aiAssistant.presets.risk.description"),
      icon: "pi pi-shield",
      label: t("aiAssistant.presets.risk.label"),
      prompt: t("aiAssistant.presets.risk.prompt"),
    },
  ];
}

function getAiLocale(language: string): AiLocale {
  return language.startsWith("fr") ? "fr" : "en";
}

function formatProviderName(provider: string) {
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

export { AiAssistantPage };
