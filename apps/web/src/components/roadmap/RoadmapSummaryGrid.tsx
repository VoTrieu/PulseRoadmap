import type { RoadmapSummary } from "../../types/roadmap";
import { AppCard } from "../ui/AppCard";

type RoadmapSummaryGridProps = {
  summaries: RoadmapSummary[];
};

function RoadmapSummaryGrid({ summaries }: RoadmapSummaryGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaries.map((summary) => (
        <AppCard compact key={summary.label}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm text-slate-500">{summary.label}</span>
              <strong className="mt-2 block text-3xl text-slate-950">
                {summary.value}
              </strong>
              <span className="text-sm font-medium text-slate-500">
                {summary.helper}
              </span>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <i className={summary.icon} aria-hidden="true" />
            </span>
          </div>
        </AppCard>
      ))}
    </section>
  );
}

export { RoadmapSummaryGrid };
