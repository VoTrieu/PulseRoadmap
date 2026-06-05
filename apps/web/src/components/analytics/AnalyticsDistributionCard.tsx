import type { AnalyticsDistributionItem } from "../../types/analytics";
import { AppCard } from "../ui/AppCard";

type AnalyticsDistributionCardProps = {
  items: AnalyticsDistributionItem[];
  subTitle: string;
  title: string;
};

function AnalyticsDistributionCard({
  items,
  subTitle,
  title,
}: AnalyticsDistributionCardProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <AppCard compact title={title} subTitle={subTitle}>
      <div className="grid gap-4">
        {items.map((item) => {
          const width = `${Math.max((item.value / maxValue) * 100, 6)}%`;

          return (
            <div className="grid gap-2" key={item.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-slate-700">{item.label}</span>
                <strong className="text-slate-950">{item.value}</strong>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-700"
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}

export { AnalyticsDistributionCard };
