import { AppCard } from "./AppCard";
import type { SummaryItem } from "../../types/summary";

type SummaryGridProps = {
  ariaLabel?: string;
  className: string;
  summaries: SummaryItem[];
};

function SummaryGrid({ ariaLabel, className, summaries }: SummaryGridProps) {
  return (
    <section aria-label={ariaLabel} className={`grid gap-4 ${className}`}>
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
              <i aria-hidden="true" className={summary.icon} />
            </span>
          </div>
        </AppCard>
      ))}
    </section>
  );
}

export { SummaryGrid };
