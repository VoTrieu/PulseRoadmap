import { useQuery } from "@tanstack/react-query";
import { FeedbackFilters } from "../../components/feedback/FeedbackFilters";
import { FeedbackInboxTable } from "../../components/feedback/FeedbackInboxTable";
import { FeedbackSummaryGrid } from "../../components/feedback/FeedbackSummaryGrid";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { feedbackSummaries } from "../../data/feedbackSampleData";
import { getFeedback } from "../../services/feedbackApi";

function FeedbackPage() {
  const {
    data: feedback = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: getFeedback,
  });

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: "Add feedback" }}
        eyebrow="Feedback"
        subtitle="Triage customer requests, identify duplicate themes, and link feedback to roadmap work."
        title="Customer feedback inbox"
      />

      <FeedbackSummaryGrid summaries={feedbackSummaries} />
      <FeedbackFilters />

      <section className="mt-4">
        {isLoading ? (
          <LoadingState message="Loading feedback..." />
        ) : isError ? (
          <ErrorState
            title="Could not load feedback"
            message="Make sure the FastAPI backend is running on port 8000, then try again."
            onRetry={() => void refetch()}
          />
        ) : (
          <FeedbackInboxTable feedback={feedback} />
        )}
      </section>
    </>
  );
}

export { FeedbackPage };
