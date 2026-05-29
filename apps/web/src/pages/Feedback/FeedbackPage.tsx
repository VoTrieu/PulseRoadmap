import { useState } from "react";
import { FeedbackFormDialog } from "../../components/feedback/FeedbackFormDialog";
import { FeedbackFilters } from "../../components/feedback/FeedbackFilters";
import { FeedbackInboxTable } from "../../components/feedback/FeedbackInboxTable";
import { FeedbackSummaryGrid } from "../../components/feedback/FeedbackSummaryGrid";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { feedbackSummaries } from "../../data/feedbackSampleData";
import { useCreateFeedback, useFeedbackList } from "../../queries/feedbackQueries";
import type { FeedbackCreateInput } from "../../types/feedback";

function FeedbackPage() {
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const {
    data: feedback = [],
    isError,
    isLoading,
    refetch,
  } = useFeedbackList();
  const createFeedbackMutation = useCreateFeedback();

  function handleCreateFeedback(input: FeedbackCreateInput) {
    createFeedbackMutation.mutate(input, {
      onSuccess: () => setIsAddDialogVisible(false),
    });
  }

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: "Add feedback" }}
        onAction={() => setIsAddDialogVisible(true)}
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

      <FeedbackFormDialog
        isSubmitting={createFeedbackMutation.isPending}
        mode="create"
        onHide={() => setIsAddDialogVisible(false)}
        onSubmit={handleCreateFeedback}
        visible={isAddDialogVisible}
      />
    </>
  );
}

export { FeedbackPage };
