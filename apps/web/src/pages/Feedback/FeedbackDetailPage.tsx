import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FeedbackDetailSummary } from "../../components/feedback/FeedbackDetailSummary";
import { FeedbackFormDialog } from "../../components/feedback/FeedbackFormDialog";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAppConfirm } from "../../hooks/useAppConfirm";
import {
  useDeleteFeedback,
  useFeedbackDetail,
  useUpdateFeedback,
} from "../../queries/feedbackQueries";
import type { FeedbackCreateInput } from "../../types/feedback";

function FeedbackDetailPage() {
  const { feedbackId = "" } = useParams();
  const navigate = useNavigate();
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const deleteFeedbackMutation = useDeleteFeedback();
  const updateFeedbackMutation = useUpdateFeedback();
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

  function handleUpdateFeedback(input: FeedbackCreateInput) {
    if (!feedbackId) {
      return;
    }

    updateFeedbackMutation.mutate(
      { feedbackId, input },
      { onSuccess: () => setIsEditDialogVisible(false) },
    );
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
        actions={[
          {
            disabled: updateFeedbackMutation.isPending,
            icon: "pi pi-pencil",
            label: "Edit",
            onClick: () => setIsEditDialogVisible(true),
            outlined: true,
            severity: "success",
          },
          {
            disabled: deleteFeedbackMutation.isPending,
            icon: "pi pi-trash",
            label: deleteFeedbackMutation.isPending ? "Deleting..." : "Delete",
            loading: deleteFeedbackMutation.isPending,
            onClick: handleDeleteFeedback,
            severity: "danger",
          },
        ]}
        eyebrow="Feedback"
        title={feedback.request}
        subtitle={feedback.customer}
      />
      <FeedbackDetailSummary feedback={feedback} />
      <FeedbackFormDialog
        initialValue={feedback}
        isSubmitting={updateFeedbackMutation.isPending}
        mode="edit"
        onHide={() => setIsEditDialogVisible(false)}
        onSubmit={handleUpdateFeedback}
        visible={isEditDialogVisible}
      />
    </>
  );
}

export { FeedbackDetailPage };
