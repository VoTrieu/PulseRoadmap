import { AppCard } from "../ui/AppCard";
import type { Metric } from "../../types/dashboard";

type MetricsGridProps = {
  metrics: Metric[];
};

function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Key metrics">
      {metrics.map((metric) => (
        <AppCard
          className={`border-t-4 ${metric.accent}`}
          key={metric.label}
        >
          <span className="text-sm text-slate-500">{metric.label}</span>
          <strong className="mt-2 block text-3xl text-slate-950">{metric.value}</strong>
          <span className="text-sm font-medium text-slate-500">{metric.change}</span>
        </AppCard>
      ))}
    </section>
  );
}

export { MetricsGrid };
