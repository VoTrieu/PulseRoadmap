import type { RoadmapSummary } from "../../types/roadmap";
import { SummaryGrid } from "../ui/SummaryGrid";

type RoadmapSummaryGridProps = {
  summaries: RoadmapSummary[];
};

function RoadmapSummaryGrid({ summaries }: RoadmapSummaryGridProps) {
  return (
    <SummaryGrid
      className="md:grid-cols-2 xl:grid-cols-4"
      summaries={summaries}
    />
  );
}

export { RoadmapSummaryGrid };
