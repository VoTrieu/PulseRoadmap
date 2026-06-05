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
import { useBugList } from "../../queries/bugQueries";
import { useFeedbackList } from "../../queries/feedbackQueries";
import { useReleaseList } from "../../queries/releaseQueries";
import { useRoadmapFeatureList } from "../../queries/roadmapQueries";
import type {
  AiAssistantMetric,
  AiBrief,
  AiContextItem,
  AiPromptPreset,
} from "../../types/aiAssistant";
import type { BugReport } from "../../types/bug";
import type { FeedbackInboxItem } from "../../types/feedback";
import type { Release } from "../../types/release";
import type { RoadmapFeature } from "../../types/roadmap";

const AI_CONTEXT_PAGE_SIZE = 100;

function AiAssistantPage() {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState(t("aiAssistant.defaultPrompt"));
  const [brief, setBrief] = useState<AiBrief>({
    sections: [],
    title: t("aiAssistant.brief.defaultTitle"),
  });
  const feedbackQuery = useFeedbackList(
    { search: "" },
    { skip: 0, take: AI_CONTEXT_PAGE_SIZE },
  );
  const roadmapQuery = useRoadmapFeatureList(
    { search: "" },
    { skip: 0, take: AI_CONTEXT_PAGE_SIZE },
  );
  const bugQuery = useBugList(
    { search: "" },
    { skip: 0, take: AI_CONTEXT_PAGE_SIZE },
  );
  const releaseQuery = useReleaseList(
    { search: "" },
    { skip: 0, take: AI_CONTEXT_PAGE_SIZE },
  );
  const isLoading =
    feedbackQuery.isLoading ||
    roadmapQuery.isLoading ||
    bugQuery.isLoading ||
    releaseQuery.isLoading;
  const isError =
    feedbackQuery.isError ||
    roadmapQuery.isError ||
    bugQuery.isError ||
    releaseQuery.isError;
  const feedback = feedbackQuery.data?.items ?? [];
  const roadmap = roadmapQuery.data?.items ?? [];
  const bugs = bugQuery.data?.items ?? [];
  const releases = releaseQuery.data?.items ?? [];
  const translate = (key: TranslationKey) => t(key);
  const summaries = useMemo(
    () => buildAiSummaries(feedback, roadmap, bugs, releases, translate),
    [bugs, feedback, releases, roadmap, translate],
  );
  const contextItems = useMemo(
    () => buildContextItems(feedback, roadmap, bugs, releases, translate),
    [bugs, feedback, releases, roadmap, translate],
  );
  const presets = useMemo(() => buildPromptPresets(translate), [translate]);

  function retryAll() {
    void feedbackQuery.refetch();
    void roadmapQuery.refetch();
    void bugQuery.refetch();
    void releaseQuery.refetch();
  }

  function generateBrief() {
    setBrief(buildBrief(prompt, feedback, roadmap, bugs, releases, translate));
  }

  return (
    <>
      <PageHeader
        eyebrow={t("aiAssistant.eyebrow")}
        subtitle={t("aiAssistant.page.subtitle")}
        title={t("aiAssistant.page.title")}
      />

      {isLoading ? (
        <LoadingState message={t("aiAssistant.loading")} />
      ) : isError ? (
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
  feedback: FeedbackInboxItem[],
  roadmap: RoadmapFeature[],
  bugs: BugReport[],
  releases: Release[],
  t: (key: TranslationKey) => string,
): AiAssistantMetric[] {
  const highUrgencyFeedback = feedback.filter(
    (item) => item.urgency === "High",
  ).length;
  const highPriorityFeatures = roadmap.filter(
    (feature) => feature.priority === "High",
  ).length;
  const criticalBugs = bugs.filter((bug) => bug.severity === "Critical").length;
  const publicReleases = releases.filter((release) => release.isPublic).length;

  return [
    {
      label: t("aiAssistant.summary.feedbackLabel"),
      value: String(highUrgencyFeedback),
      helper: t("aiAssistant.summary.feedbackHelper"),
      icon: "pi pi-inbox",
    },
    {
      label: t("aiAssistant.summary.roadmapLabel"),
      value: String(highPriorityFeatures),
      helper: t("aiAssistant.summary.roadmapHelper"),
      icon: "pi pi-sitemap",
    },
    {
      label: t("aiAssistant.summary.bugsLabel"),
      value: String(criticalBugs),
      helper: t("aiAssistant.summary.bugsHelper"),
      icon: "pi pi-exclamation-triangle",
    },
    {
      label: t("aiAssistant.summary.releasesLabel"),
      value: String(publicReleases),
      helper: t("aiAssistant.summary.releasesHelper"),
      icon: "pi pi-send",
    },
  ];
}

function buildContextItems(
  feedback: FeedbackInboxItem[],
  roadmap: RoadmapFeature[],
  bugs: BugReport[],
  releases: Release[],
  t: (key: TranslationKey) => string,
): AiContextItem[] {
  return [
    {
      label: t("aiAssistant.context.feedback"),
      value: String(feedback.length),
    },
    {
      label: t("aiAssistant.context.roadmap"),
      value: String(roadmap.length),
    },
    {
      label: t("aiAssistant.context.bugs"),
      value: String(bugs.length),
    },
    {
      label: t("aiAssistant.context.releases"),
      value: String(releases.length),
    },
    {
      label: t("aiAssistant.context.topFeedbackArea"),
      value: topLabel(feedback, (item) => item.productArea) ?? t("aiAssistant.none"),
    },
    {
      label: t("aiAssistant.context.nextRelease"),
      value: releases[0]?.name ?? t("aiAssistant.none"),
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

function buildBrief(
  prompt: string,
  feedback: FeedbackInboxItem[],
  roadmap: RoadmapFeature[],
  bugs: BugReport[],
  releases: Release[],
  t: (key: TranslationKey) => string,
): AiBrief {
  const topFeedbackArea = topLabel(feedback, (item) => item.productArea) ?? t("aiAssistant.none");
  const topRoadmapItem = roadmap[0]?.title ?? t("aiAssistant.none");
  const criticalBugCount = bugs.filter((bug) => bug.severity === "Critical").length;
  const nextRelease = releases[0]?.name ?? t("aiAssistant.none");

  return {
    title: t("aiAssistant.brief.generatedTitle"),
    sections: [
      {
        title: t("aiAssistant.brief.sections.request"),
        body: prompt.trim() || t("aiAssistant.defaultPrompt"),
      },
      {
        title: t("aiAssistant.brief.sections.customerSignals"),
        body: formatTemplate(t("aiAssistant.brief.customerSignalsBody"), {
          count: feedback.length,
          area: topFeedbackArea,
        }),
      },
      {
        title: t("aiAssistant.brief.sections.deliveryPlan"),
        body: formatTemplate(t("aiAssistant.brief.deliveryPlanBody"), {
          feature: topRoadmapItem,
          release: nextRelease,
        }),
      },
      {
        title: t("aiAssistant.brief.sections.risks"),
        body: formatTemplate(t("aiAssistant.brief.risksBody"), {
          count: criticalBugCount,
        }),
      },
    ],
  };
}

function formatTemplate(
  template: string,
  values: Record<string, number | string>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, String(value)),
    template,
  );
}

function topLabel<T>(items: T[], getLabel: (item: T) => string) {
  const counts = items.reduce<Record<string, number>>((result, item) => {
    const label = getLabel(item);
    result[label] = (result[label] ?? 0) + 1;
    return result;
  }, {});

  return Object.entries(counts).sort(
    (first, second) => second[1] - first[1] || first[0].localeCompare(second[0]),
  )[0]?.[0];
}

export { AiAssistantPage };
