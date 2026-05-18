import { AppCard } from "../ui/AppCard";
import type { FeedbackSummary } from "../../types/feedback";

type FeedbackSummaryGridProps = {
  summaries: FeedbackSummary[];
};

function FeedbackSummaryGrid({ summaries }: FeedbackSummaryGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3" aria-label="Feedback summary">
      {summaries.map((summary) => (
        <AppCard key={summary.label} compact>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm text-slate-500">{summary.label}</span>
              <strong className="mt-2 block text-3xl text-slate-950">{summary.value}</strong>
              <span className="text-sm font-medium text-slate-500">{summary.helper}</span>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-teal-700">
              <i className={summary.icon} />
            </span>
          </div>
        </AppCard>
      ))}
    </section>
  );
}

export { FeedbackSummaryGrid };
