import { useParams, useNavigate } from "react-router-dom";
import {
  useFeedbackDetail,
  useDeleteFeedback,
} from "../../queries/feedbackQueries";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PageHeader } from "../../components/ui/PageHeader";
import { FeedbackDetailSummary } from "../../components/feedback/FeedbackDetailSummary";
import { useAppConfirm } from "../../hooks/useAppConfirm";

function FeedbackDetailPage() {
  const { feedbackId = "" } = useParams();
  const navigate = useNavigate();
  const deleteFeedbackMutation = useDeleteFeedback();
  const { confirm } = useAppConfirm();

  const {
    data: feedback,
    isLoading,
    isError,
    refetch,
  } = useFeedbackDetail(feedbackId);

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

  const handleDeleteFeedback = () => {
    if (!feedbackId) return;

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
  };

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-trash", label: "Delete" }}
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
