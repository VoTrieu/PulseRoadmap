import type { AnalyticsMetric } from "../../types/analytics";
import { SummaryGrid } from "../ui/SummaryGrid";

type AnalyticsSummaryGridProps = {
  summaries: AnalyticsMetric[];
};

function AnalyticsSummaryGrid({ summaries }: AnalyticsSummaryGridProps) {
  return (
    <SummaryGrid
      ariaLabel="Analytics summary"
      className="md:grid-cols-2 xl:grid-cols-4"
      summaries={summaries}
    />
  );
}

export { AnalyticsSummaryGrid };
