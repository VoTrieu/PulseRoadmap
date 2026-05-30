import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FeedbackDetailSummary } from "../../components/feedback/FeedbackDetailSummary";
import { FeedbackFormDialog } from "../../components/feedback/FeedbackFormDialog";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { FEEDBACK_ACTION_SEVERITY } from "../../constants/feedbackConstants";
import { useAppConfirm } from "../../hooks/useAppConfirm";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      acceptLabel: t("common.delete"),
      header: t("feedback.delete.header"),
      message: t("feedback.delete.message"),
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
    return <LoadingState message={t("feedback.loading")} />;
  }

  if (isError || !feedback) {
    return (
      <ErrorState
        title={t("feedback.detailLoadErrorTitle")}
        message={t("feedback.detailLoadErrorMessage")}
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
            label: t("common.edit"),
            onClick: () => setIsEditDialogVisible(true),
            outlined: true,
            severity: FEEDBACK_ACTION_SEVERITY.edit,
          },
          {
            disabled: deleteFeedbackMutation.isPending,
            icon: "pi pi-trash",
            label: deleteFeedbackMutation.isPending
              ? t("common.deleting")
              : t("common.delete"),
            loading: deleteFeedbackMutation.isPending,
            onClick: handleDeleteFeedback,
            severity: FEEDBACK_ACTION_SEVERITY.delete,
          },
        ]}
        eyebrow={t("feedback.eyebrow")}
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
