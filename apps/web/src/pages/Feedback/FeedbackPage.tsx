import { useMemo, useState } from "react";
import { FeedbackFormDialog } from "../../components/feedback/FeedbackFormDialog";
import { FeedbackFilters } from "../../components/feedback/FeedbackFilters";
import { FeedbackInboxTable } from "../../components/feedback/FeedbackInboxTable";
import { FeedbackSummaryGrid } from "../../components/feedback/FeedbackSummaryGrid";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { feedbackSummaries } from "../../data/feedbackSampleData";
import { useTranslation } from "react-i18next";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useCreateFeedback, useFeedbackList } from "../../queries/feedbackQueries";
import type { FeedbackCreateInput, FeedbackListFilters, PaginationParams } from "../../types/feedback";

function FeedbackPage() {
  const [filters, setFilters] = useState<FeedbackListFilters>({ search: "" });
  const [pagination, setPagination] = useState<PaginationParams>({ skip: 0, take: 10 });
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const debouncedSearch = useDebouncedValue(filters.search);
  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [debouncedSearch, filters],
  );
  const {
    data: feedbackResponse,
    isError,
    isLoading,
    refetch,
  } = useFeedbackList(queryFilters, pagination);
  const createFeedbackMutation = useCreateFeedback();
  const { t } = useTranslation();

  function handleCreateFeedback(input: FeedbackCreateInput) {
    createFeedbackMutation.mutate(input, {
      onSuccess: () => setIsAddDialogVisible(false),
    });
  }

  function handlePageChange(newPagination: PaginationParams) {
    setPagination(newPagination);
  }

  const feedback = feedbackResponse?.items ?? [];
  const totalRecords = feedbackResponse?.total ?? 0;

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
      <FeedbackFilters value={filters} onChange={setFilters} />

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
          <FeedbackInboxTable
            feedback={feedback}
            totalRecords={totalRecords}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
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
