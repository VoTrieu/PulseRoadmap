import type { BugSummary } from "../../types/bug";
import { SummaryGrid } from "../ui/SummaryGrid";

type BugSummaryGridProps = {
  summaries: BugSummary[];
};

function BugSummaryGrid({ summaries }: BugSummaryGridProps) {
  return (
    <SummaryGrid
      ariaLabel="Bug triage summary"
      className="md:grid-cols-2 xl:grid-cols-4"
      summaries={summaries}
    />
  );
}

export { BugSummaryGrid };
