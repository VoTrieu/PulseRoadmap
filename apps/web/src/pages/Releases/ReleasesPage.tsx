import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReleaseFilters } from "../../components/release/ReleaseFilters";
import { ReleaseFormDialog } from "../../components/release/ReleaseFormDialog";
import { ReleaseSummaryGrid } from "../../components/release/ReleaseSummaryGrid";
import { ReleaseTable } from "../../components/release/ReleaseTable";
import { ErrorState } from "../../components/ui/ErrorState";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import type { TranslationKey } from "../../i18n/translations";
import { useAppConfirm } from "../../hooks/useAppConfirm";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import {
  useCreateRelease,
  useDeleteRelease,
  useReleaseList,
  useUpdateRelease,
} from "../../queries/releaseQueries";
import type {
  PaginationParams,
  Release,
  ReleaseCreateInput,
  ReleaseFilters as ReleaseFiltersValue,
  ReleaseSummary,
} from "../../types/release";

function ReleasesPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ReleaseFiltersValue>({ search: "" });
  const [pagination, setPagination] = useState({ skip: 0, take: 10 });
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);
  const debouncedSearch = useDebouncedValue(filters.search);
  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [debouncedSearch, filters],
  );
  const {
    data: releaseResponse,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useReleaseList(queryFilters, pagination);
  const createReleaseMutation = useCreateRelease();
  const updateReleaseMutation = useUpdateRelease();
  const deleteReleaseMutation = useDeleteRelease();
  const { confirm } = useAppConfirm();
  const releases = releaseResponse?.items ?? [];
  const totalRecords = releaseResponse?.total ?? 0;
  const translate = (key: TranslationKey) => t(key);
  const summaries = useMemo(
    () => buildReleaseSummaries(releases, translate),
    [releases, translate],
  );

  function handleCreateRelease(input: ReleaseCreateInput) {
    createReleaseMutation.mutate(input, {
      onSuccess: () => setIsCreateDialogVisible(false),
    });
  }

  function handleUpdateRelease(input: ReleaseCreateInput) {
    if (!editingRelease) return;

    updateReleaseMutation.mutate(
      { releaseId: editingRelease.id, input },
      { onSuccess: () => setEditingRelease(null) },
    );
  }

  function handleDeleteRelease(release: Release) {
    confirm({
      acceptLabel: t("common.delete"),
      header: t("releases.delete.header"),
      message:
        release.status === "Shipped"
          ? t("releases.delete.shippedMessage")
          : t("releases.delete.message"),
      onAccept: () => deleteReleaseMutation.mutate(release.id),
    });
  }

  function handleFiltersChange(nextFilters: ReleaseFiltersValue) {
    setFilters(nextFilters);
    setPagination((current) => ({ ...current, skip: 0 }));
  }

  function handlePageChange(newPagination: PaginationParams) {
    setPagination(newPagination);
  }

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: t("releases.addRelease") }}
        eyebrow={t("releases.eyebrow")}
        onAction={() => setIsCreateDialogVisible(true)}
        subtitle={t("releases.page.subtitle")}
        title={t("releases.page.title")}
      />
      <ReleaseSummaryGrid summaries={summaries} />
      <ReleaseFilters onChange={handleFiltersChange} value={filters} />

      {isLoading ? (
        <LoadingState message={t("releases.loading")} />
      ) : isError ? (
        <ErrorState
          message={t("releases.listLoadErrorMessage")}
          onRetry={() => void refetch()}
          title={t("releases.listLoadErrorTitle")}
        />
      ) : (
        <ReleaseTable
          first={pagination.skip}
          isLoading={isFetching}
          onDeleteRelease={handleDeleteRelease}
          onEditRelease={setEditingRelease}
          onPageChange={handlePageChange}
          releases={releases}
          rows={pagination.take}
          totalRecords={totalRecords}
        />
      )}

      <ReleaseFormDialog
        isSubmitting={createReleaseMutation.isPending}
        mode="create"
        onHide={() => setIsCreateDialogVisible(false)}
        onSubmit={handleCreateRelease}
        visible={isCreateDialogVisible}
      />
      <ReleaseFormDialog
        initialValue={editingRelease ?? undefined}
        isSubmitting={updateReleaseMutation.isPending}
        mode="edit"
        onHide={() => setEditingRelease(null)}
        onSubmit={handleUpdateRelease}
        visible={Boolean(editingRelease)}
      />
    </>
  );
}

function buildReleaseSummaries(
  releases: Release[],
  t: (key: TranslationKey) => string,
): ReleaseSummary[] {
  const plannedCount = releases.filter(
    (release) => release.status === "Planned",
  ).length;
  const qaCount = releases.filter(
    (release) => release.status === "QA" || release.status === "Staged",
  ).length;
  const shippedCount = releases.filter(
    (release) => release.status === "Shipped",
  ).length;
  const publicCount = releases.filter((release) => release.isPublic).length;

  return [
    {
      label: t("releases.summary.plannedLabel"),
      value: String(plannedCount),
      helper: t("releases.summary.plannedHelper"),
      icon: "pi pi-calendar-plus",
    },
    {
      label: t("releases.summary.qaLabel"),
      value: String(qaCount),
      helper: t("releases.summary.qaHelper"),
      icon: "pi pi-check-square",
    },
    {
      label: t("releases.summary.shippedLabel"),
      value: String(shippedCount),
      helper: t("releases.summary.shippedHelper"),
      icon: "pi pi-send",
    },
    {
      label: t("releases.summary.publicLabel"),
      value: String(publicCount),
      helper: t("releases.summary.publicHelper"),
      icon: "pi pi-globe",
    },
  ];
}

export { ReleasesPage };
