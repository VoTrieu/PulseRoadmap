import { Button } from "primereact/button";
import { AiInsightsCard } from "../../components/dashboard/AiInsightsCard";
import { BugSeverityCard } from "../../components/dashboard/BugSeverityCard";
import { FeedbackTrendCard } from "../../components/dashboard/FeedbackTrendCard";
import { MetricsGrid } from "../../components/dashboard/MetricsGrid";
import { RecentFeedbackCard } from "../../components/dashboard/RecentFeedbackCard";
import { RoadmapProgressCard } from "../../components/dashboard/RoadmapProgressCard";
import { bugMix, feedback, feedbackTrend, insights, metrics, roadmap } from "../../data/dashboardSampleData";

function DashboardPage() {
  return (
    <>
      <section className="flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-teal-700">Dashboard</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950">
            Product operations command center
          </h1>
        </div>
        <Button
          className="min-h-11 gap-2 rounded-lg border-teal-700 bg-teal-700 px-4 font-bold shadow-lg shadow-teal-900/15 [&_.p-button-icon-left]:m-0"
          icon="pi pi-sparkles"
          label="Generate brief"
        />
      </section>

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
