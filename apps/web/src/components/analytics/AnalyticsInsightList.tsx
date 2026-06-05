import type { AnalyticsInsight } from "../../types/analytics";
import { AppCard } from "../ui/AppCard";

type AnalyticsInsightListProps = {
  insights: AnalyticsInsight[];
  subTitle: string;
  title: string;
};

function AnalyticsInsightList({
  insights,
  subTitle,
  title,
}: AnalyticsInsightListProps) {
  return (
    <AppCard compact title={title} subTitle={subTitle}>
      <div className="grid gap-4">
        {insights.map((insight) => (
          <div
            className="border-l-4 border-teal-500 pl-3"
            key={insight.label}
          >
            <div className="flex items-start justify-between gap-4">
              <strong className="text-slate-900">{insight.label}</strong>
              <span className="text-sm font-bold text-teal-700">
                {insight.value}
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {insight.helper}
            </p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

export { AnalyticsInsightList };
