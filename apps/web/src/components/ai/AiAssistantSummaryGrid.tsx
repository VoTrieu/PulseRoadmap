import { SummaryGrid } from "../ui/SummaryGrid";
import type { AiAssistantMetric } from "../../types/aiAssistant";

type AiAssistantSummaryGridProps = {
  summaries: AiAssistantMetric[];
};

function AiAssistantSummaryGrid({ summaries }: AiAssistantSummaryGridProps) {
  return (
    <SummaryGrid
      ariaLabel="AI assistant summary"
      className="mb-4 md:grid-cols-2 xl:grid-cols-4"
      summaries={summaries}
    />
  );
}

export { AiAssistantSummaryGrid };
