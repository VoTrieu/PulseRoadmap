import { useNavigate, useParams } from "react-router-dom";
import { FeedbackDetailSummary } from "../../components/feedback/FeedbackDetailSummary";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAppConfirm } from "../../hooks/useAppConfirm";
import {
  useDeleteFeedback,
  useFeedbackDetail,
} from "../../queries/feedbackQueries";

function FeedbackDetailPage() {
  const { feedbackId = "" } = useParams();
  const navigate = useNavigate();
  const deleteFeedbackMutation = useDeleteFeedback();
  const { confirm } = useAppConfirm();
  const {
    data: feedback,
    isError,
    isLoading,
    refetch,
  } = useFeedbackDetail(feedbackId);

  function handleDeleteFeedback() {
    if (!feedbackId) {
      return;
    }

    confirm({
      acceptLabel: "Delete",
      header: "Delete feedback",
      message: "This feedback item will be permanently deleted.",
      onAccept: () => {
        deleteFeedbackMutation.mutate(feedbackId, {
          onSuccess: () => navigate("/feedback"),
        });
      },
    });
  }

  if (isLoading) {
    return <LoadingState message="Loading feedback..." />;
  }

  if (isError || !feedback) {
    return (
      <ErrorState
        title="Could not load feedback"
        message="This feedback item may not exist or there was an error loading it. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <>
      <PageHeader
        action={{
          disabled: deleteFeedbackMutation.isPending,
          icon: "pi pi-trash",
          label: deleteFeedbackMutation.isPending ? "Deleting..." : "Delete",
          loading: deleteFeedbackMutation.isPending,
        }}
        onAction={handleDeleteFeedback}
        eyebrow="Feedback"
        title={feedback.request}
        subtitle={feedback.customer}
      />
      <FeedbackDetailSummary feedback={feedback} />
    </>
  );
}

export { FeedbackDetailPage };
