import type { Insight } from "../../types/dashboard";
import { AppCard } from "../ui/AppCard";

type AiInsightsCardProps = {
  insights: Insight[];
};

function AiInsightsCard({ insights }: AiInsightsCardProps) {
  return (
    <AppCard
      className="row-span-2"
      title="AI insights"
      subTitle="Suggested next actions"
    >
      <div className="grid gap-5">
        {insights.map((insight) => (
          <div className="border-l-4 border-teal-500 pl-3" key={insight.title}>
            <strong className="block">{insight.title}</strong>
            <p className="mt-1 text-sm leading-6 text-slate-500">{insight.body}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

export { AiInsightsCard };
