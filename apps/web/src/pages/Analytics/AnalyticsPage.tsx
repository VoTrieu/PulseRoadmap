import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AnalyticsDistributionCard } from "../../components/analytics/AnalyticsDistributionCard";
import { AnalyticsInsightList } from "../../components/analytics/AnalyticsInsightList";
import { AnalyticsSummaryGrid } from "../../components/analytics/AnalyticsSummaryGrid";
import { AnalyticsTrendCard } from "../../components/analytics/AnalyticsTrendCard";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { useBugList } from "../../queries/bugQueries";
import { useFeedbackList } from "../../queries/feedbackQueries";
import { useReleaseList } from "../../queries/releaseQueries";
import { useRoadmapFeatureList } from "../../queries/roadmapQueries";
import type {
  AnalyticsDistributionItem,
  AnalyticsInsight,
  AnalyticsMetric,
} from "../../types/analytics";
import type { BugReport } from "../../types/bug";
import type { FeedbackInboxItem } from "../../types/feedback";
import type { Release } from "../../types/release";
import type { RoadmapFeature } from "../../types/roadmap";

const ANALYTICS_PAGE_SIZE = 100;

function AnalyticsPage() {
  const { t } = useTranslation();
  const feedbackQuery = useFeedbackList(
    { search: "" },
    { skip: 0, take: ANALYTICS_PAGE_SIZE },
  );
  const roadmapQuery = useRoadmapFeatureList(
    { search: "" },
    { skip: 0, take: ANALYTICS_PAGE_SIZE },
  );
  const bugQuery = useBugList(
    { search: "" },
    { skip: 0, take: ANALYTICS_PAGE_SIZE },
  );
  const releaseQuery = useReleaseList(
    { search: "" },
    { skip: 0, take: ANALYTICS_PAGE_SIZE },
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
  const summaries = useMemo(
    () => buildSummaries(feedback, roadmap, bugs, releases, t),
    [bugs, feedback, releases, roadmap, t],
  );
  const feedbackByArea = useMemo(
    () => countBy(feedback, (item) => item.productArea),
    [feedback],
  );
  const bugBySeverity = useMemo(
    () => countBy(bugs, (item) => item.severity),
    [bugs],
  );
  const roadmapByStatus = useMemo(
    () => countBy(roadmap, (item) => item.status),
    [roadmap],
  );
  const releaseByStatus = useMemo(
    () => countBy(releases, (item) => item.status),
    [releases],
  );
  const insights = useMemo(
    () => buildInsights(feedbackByArea, bugBySeverity, roadmapByStatus, releases, t),
    [bugBySeverity, feedbackByArea, releases, roadmapByStatus, t],
  );

  function retryAll() {
    void feedbackQuery.refetch();
    void roadmapQuery.refetch();
    void bugQuery.refetch();
    void releaseQuery.refetch();
  }

  return (
    <>
      <PageHeader
        eyebrow={t("analytics.eyebrow")}
        subtitle={t("analytics.page.subtitle")}
        title={t("analytics.page.title")}
      />

      {isLoading ? (
        <LoadingState message={t("analytics.loading")} />
      ) : isError ? (
        <ErrorState
          message={t("analytics.listLoadErrorMessage")}
          onRetry={retryAll}
          title={t("analytics.listLoadErrorTitle")}
        />
      ) : (
        <>
          <AnalyticsSummaryGrid summaries={summaries} />

          <section className="mt-4 grid gap-4 xl:grid-cols-2">
            <AnalyticsTrendCard
              items={feedbackByArea.slice(0, 5)}
              subTitle={t("analytics.feedbackByArea.subtitle")}
              title={t("analytics.feedbackByArea.title")}
            />
            <AnalyticsDistributionCard
              items={bugBySeverity}
              subTitle={t("analytics.bugSeverity.subtitle")}
              title={t("analytics.bugSeverity.title")}
            />
            <AnalyticsDistributionCard
              items={roadmapByStatus}
              subTitle={t("analytics.roadmapStatus.subtitle")}
              title={t("analytics.roadmapStatus.title")}
            />
            <AnalyticsDistributionCard
              items={releaseByStatus}
              subTitle={t("analytics.releasePipeline.subtitle")}
              title={t("analytics.releasePipeline.title")}
            />
            <div className="xl:col-span-2">
              <AnalyticsInsightList
                insights={insights}
                subTitle={t("analytics.insights.subtitle")}
                title={t("analytics.insights.title")}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}

function buildSummaries(
  feedback: FeedbackInboxItem[],
  roadmap: RoadmapFeature[],
  bugs: BugReport[],
  releases: Release[],
  t: ReturnType<typeof useTranslation>["t"],
): AnalyticsMetric[] {
  const activeBugs = bugs.filter(
    (bug) => bug.status !== "Fixed" && bug.status !== "Closed",
  ).length;
  const shippedReleases = releases.filter(
    (release) => release.status === "Shipped",
  ).length;

  return [
    {
      label: t("analytics.summary.feedbackLabel"),
      value: String(feedback.length),
      helper: t("analytics.summary.feedbackHelper"),
      icon: "pi pi-inbox",
    },
    {
      label: t("analytics.summary.roadmapLabel"),
      value: String(roadmap.length),
      helper: t("analytics.summary.roadmapHelper"),
      icon: "pi pi-sitemap",
    },
    {
      label: t("analytics.summary.bugsLabel"),
      value: String(activeBugs),
      helper: t("analytics.summary.bugsHelper"),
      icon: "pi pi-exclamation-triangle",
    },
    {
      label: t("analytics.summary.releasesLabel"),
      value: String(shippedReleases),
      helper: t("analytics.summary.releasesHelper"),
      icon: "pi pi-send",
    },
  ];
}

function buildInsights(
  feedbackByArea: AnalyticsDistributionItem[],
  bugBySeverity: AnalyticsDistributionItem[],
  roadmapByStatus: AnalyticsDistributionItem[],
  releases: Release[],
  t: ReturnType<typeof useTranslation>["t"],
): AnalyticsInsight[] {
  const topFeedbackArea = feedbackByArea[0]?.label ?? t("analytics.none");
  const criticalBugs =
    bugBySeverity.find((item) => item.label === "Critical")?.value ?? 0;
  const inProgressFeatures =
    roadmapByStatus.find((item) => item.label === "In progress")?.value ?? 0;
  const publicReleaseCount = releases.filter((release) => release.isPublic).length;

  return [
    {
      label: t("analytics.insights.feedbackFocusLabel"),
      helper: t("analytics.insights.feedbackFocusHelper"),
      value: topFeedbackArea,
    },
    {
      label: t("analytics.insights.criticalBugLabel"),
      helper: t("analytics.insights.criticalBugHelper"),
      value: String(criticalBugs),
    },
    {
      label: t("analytics.insights.executionLabel"),
      helper: t("analytics.insights.executionHelper"),
      value: String(inProgressFeatures),
    },
    {
      label: t("analytics.insights.changelogLabel"),
      helper: t("analytics.insights.changelogHelper"),
      value: String(publicReleaseCount),
    },
  ];
}

function countBy<T>(items: T[], getLabel: (item: T) => string) {
  const counts = items.reduce<Record<string, number>>((result, item) => {
    const label = getLabel(item);
    result[label] = (result[label] ?? 0) + 1;
    return result;
  }, {});

  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((first, second) => second.value - first.value || first.label.localeCompare(second.label));
}

export { AnalyticsPage };
