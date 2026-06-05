import type { AnalyticsDistributionItem } from "../../types/analytics";
import { AppCard } from "../ui/AppCard";

type AnalyticsTrendCardProps = {
  items: AnalyticsDistributionItem[];
  subTitle: string;
  title: string;
};

function AnalyticsTrendCard({ items, subTitle, title }: AnalyticsTrendCardProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <AppCard title={title} subTitle={subTitle}>
      <div className="grid h-44 grid-cols-5 items-end gap-3 border-t border-slate-100 pt-5">
        {items.map((item) => {
          const height = `${Math.max((item.value / maxValue) * 100, 10)}%`;

          return (
            <div className="grid h-full items-end gap-2" key={item.label}>
              <div
                aria-label={`${item.label}: ${item.value}`}
                className="rounded-t-lg bg-linear-to-t from-teal-500 to-blue-600"
                style={{ height }}
              />
              <span className="text-center text-xs font-semibold text-slate-500">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}

export { AnalyticsTrendCard };
