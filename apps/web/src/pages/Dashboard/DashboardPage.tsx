import { AiInsightsCard } from "../../components/dashboard/AiInsightsCard";
import { BugSeverityCard } from "../../components/dashboard/BugSeverityCard";
import { FeedbackTrendCard } from "../../components/dashboard/FeedbackTrendCard";
import { MetricsGrid } from "../../components/dashboard/MetricsGrid";
import { RecentFeedbackCard } from "../../components/dashboard/RecentFeedbackCard";
import { RoadmapProgressCard } from "../../components/dashboard/RoadmapProgressCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { bugMix, feedback, feedbackTrend, insights, metrics, roadmap } from "../../data/dashboardSampleData";
import { useTranslation } from "react-i18next";

function DashboardPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-sparkles", label: t("dashboard.generateBrief") }}
        eyebrow={t("dashboard.eyebrow")}
        title={t("dashboard.title")}
      />

      <MetricsGrid metrics={metrics} />

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <FeedbackTrendCard values={feedbackTrend} />
        <BugSeverityCard items={bugMix} />
        <RoadmapProgressCard items={roadmap} />
        <AiInsightsCard insights={insights} />
        <RecentFeedbackCard feedback={feedback} />
      </section>
    </>
  );
}

export { DashboardPage };
