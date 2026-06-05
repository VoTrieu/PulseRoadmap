import type { ReleaseSummary } from "../../types/release";
import { SummaryGrid } from "../ui/SummaryGrid";

type ReleaseSummaryGridProps = {
  summaries: ReleaseSummary[];
};

function ReleaseSummaryGrid({ summaries }: ReleaseSummaryGridProps) {
  return (
    <SummaryGrid
      ariaLabel="Release summary"
      className="md:grid-cols-2 xl:grid-cols-4"
      summaries={summaries}
    />
  );
}

export { ReleaseSummaryGrid };
