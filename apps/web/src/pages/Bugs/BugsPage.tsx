import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BugFilters } from "../../components/bugs/BugFilters";
import { BugFormDialog } from "../../components/bugs/BugFormDialog";
import { BugSummaryGrid } from "../../components/bugs/BugSummaryGrid";
import { BugTable } from "../../components/bugs/BugTable";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { BUG_SEVERITIES } from "../../constants/bugConstants";
import type { TranslationKey } from "../../i18n/translations";
import { useAppConfirm } from "../../hooks/useAppConfirm";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import {
  useBugList,
  useCreateBug,
  useDeleteBug,
  useUpdateBug,
} from "../../queries/bugQueries";
import type {
  BugFilters as BugFiltersValue,
  BugReport,
  BugReportCreateInput,
  BugSummary,
  PaginationParams,
} from "../../types/bug";

function BugsPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<BugFiltersValue>({ search: "" });
  const [pagination, setPagination] = useState({ skip: 0, take: 10 });
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const [editingBug, setEditingBug] = useState<BugReport | null>(null);
  const debouncedSearch = useDebouncedValue(filters.search);
  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [debouncedSearch, filters],
  );
  const {
    data: bugResponse,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useBugList(queryFilters, pagination);
  const createBugMutation = useCreateBug();
  const updateBugMutation = useUpdateBug();
  const deleteBugMutation = useDeleteBug();
  const { confirm } = useAppConfirm();
  const bugs = bugResponse?.items ?? [];
  const totalRecords = bugResponse?.total ?? 0;
  const translate = (key: TranslationKey) => t(key);
  const summaries = useMemo(
    () => buildBugSummaries(bugs, totalRecords, translate),
    [bugs, totalRecords, translate],
  );

  function handleCreateBug(input: BugReportCreateInput) {
    createBugMutation.mutate(input, {
      onSuccess: () => setIsCreateDialogVisible(false),
    });
  }

  function handleUpdateBug(input: BugReportCreateInput) {
    if (!editingBug) return;

    updateBugMutation.mutate(
      { bugId: editingBug.id, input },
      { onSuccess: () => setEditingBug(null) },
    );
  }

  function handleDeleteBug(bug: BugReport) {
    confirm({
      acceptLabel: t("common.delete"),
      header: t("bugs.delete.header"),
      message: t("bugs.delete.message"),
      onAccept: () => deleteBugMutation.mutate(bug.id),
    });
  }

  function handleFiltersChange(nextFilters: BugFiltersValue) {
    setFilters(nextFilters);
    setPagination((current) => ({ ...current, skip: 0 }));
  }

  function handlePageChange(newPagination: PaginationParams) {
    setPagination(newPagination);
  }

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: t("bugs.addBug") }}
        eyebrow={t("bugs.eyebrow")}
        onAction={() => setIsCreateDialogVisible(true)}
        subtitle={t("bugs.page.subtitle")}
        title={t("bugs.page.title")}
      />
      <BugSummaryGrid summaries={summaries} />
      <BugFilters onChange={handleFiltersChange} value={filters} />

      {isLoading ? (
        <LoadingState message={t("bugs.loading")} />
      ) : isError ? (
        <ErrorState
          message={t("bugs.listLoadErrorMessage")}
          onRetry={() => void refetch()}
          title={t("bugs.listLoadErrorTitle")}
        />
      ) : (
        <BugTable
          bugs={bugs}
          isLoading={isFetching}
          onDeleteBug={handleDeleteBug}
          onEditBug={setEditingBug}
          onPageChange={handlePageChange}
          rows={pagination.take}
          totalRecords={totalRecords}
        />
      )}

      <BugFormDialog
        isSubmitting={createBugMutation.isPending}
        mode="create"
        onHide={() => setIsCreateDialogVisible(false)}
        onSubmit={handleCreateBug}
        visible={isCreateDialogVisible}
      />
      <BugFormDialog
        initialValue={editingBug ?? undefined}
        isSubmitting={updateBugMutation.isPending}
        mode="edit"
        onHide={() => setEditingBug(null)}
        onSubmit={handleUpdateBug}
        visible={Boolean(editingBug)}
      />
    </>
  );
}

function buildBugSummaries(
  bugs: BugReport[],
  totalRecords: number,
  t: (key: TranslationKey) => string,
): BugSummary[] {
  const criticalCount = bugs.filter((bug) => bug.severity === "Critical").length;
  const activeCount = bugs.filter(
    (bug) => bug.status !== "Fixed" && bug.status !== "Closed",
  ).length;
  const fixedCount = bugs.filter((bug) => bug.status === "Fixed").length;
  const topSeverity =
    BUG_SEVERITIES.find((severity) => bugs.some((bug) => bug.severity === severity)) ?? "Low";

  return [
    {
      label: t("bugs.summary.openLabel"),
      value: String(totalRecords),
      helper: `${activeCount} ${t("bugs.summary.activeHelper")}`,
      icon: "pi pi-exclamation-triangle",
    },
    {
      label: t("bugs.summary.criticalLabel"),
      value: String(criticalCount),
      helper: t("bugs.summary.criticalHelper"),
      icon: "pi pi-shield",
    },
    {
      label: t("bugs.summary.fixedLabel"),
      value: String(fixedCount),
      helper: t("bugs.summary.fixedHelper"),
      icon: "pi pi-check-circle",
    },
    {
      label: t("bugs.summary.topSeverityLabel"),
      value: topSeverity,
      helper: t("bugs.summary.topSeverityHelper"),
      icon: "pi pi-chart-bar",
    },
  ];
}

export { BugsPage };
