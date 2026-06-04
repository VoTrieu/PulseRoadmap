import type { FeedbackSummary } from "../../types/feedback";
import { SummaryGrid } from "../ui/SummaryGrid";

type FeedbackSummaryGridProps = {
  summaries: FeedbackSummary[];
};

function FeedbackSummaryGrid({ summaries }: FeedbackSummaryGridProps) {
  return (
    <SummaryGrid
      ariaLabel="Feedback summary"
      className="md:grid-cols-3"
      summaries={summaries}
    />
  );
}

export { FeedbackSummaryGrid };
