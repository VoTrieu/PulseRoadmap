import { useState } from "react";
import { FeedbackFormDialog } from "../../components/feedback/FeedbackFormDialog";
import { FeedbackFilters } from "../../components/feedback/FeedbackFilters";
import { FeedbackInboxTable } from "../../components/feedback/FeedbackInboxTable";
import { FeedbackSummaryGrid } from "../../components/feedback/FeedbackSummaryGrid";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { feedbackSummaries } from "../../data/feedbackSampleData";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  function handleCreateFeedback(input: FeedbackCreateInput) {
    createFeedbackMutation.mutate(input, {
      onSuccess: () => setIsAddDialogVisible(false),
    });
  }

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: t("feedback.add") }}
        onAction={() => setIsAddDialogVisible(true)}
        eyebrow={t("feedback.eyebrow")}
        subtitle={t("feedback.page.subtitle")}
        title={t("feedback.page.title")}
      />

      <FeedbackSummaryGrid summaries={feedbackSummaries} />
      <FeedbackFilters />

      <section className="mt-4">
        {isLoading ? (
          <LoadingState message={t("feedback.loading")} />
        ) : isError ? (
          <ErrorState
            title={t("feedback.listLoadErrorTitle")}
            message={t("feedback.listLoadErrorMessage")}
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
