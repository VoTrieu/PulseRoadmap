import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RoadmapBoard } from "../../components/roadmap/RoadmapBoard";
import { RoadmapSummaryGrid } from "../../components/roadmap/RoadmapSummaryGrid";
import { PageHeader } from "../../components/ui/PageHeader";
import {
  useRoadmapFeatureList,
  useCreateRoadmapFeature,
  useUpdateRoadmapFeature,
  useDeleteRoadmapFeature,
} from "../../queries/roadmapQueries";
import {
  roadmapStatuses,
  roadmapSummaries,
} from "../../data/roadmapSampleData";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { RoadmapFeatureFormDialog } from "../../components/roadmap/RoadmapFeatureFormDialog";
import type {
  PaginationParams,
  RoadmapFeature,
  RoadmapFeatureCreateInput,
  RoadmapFilters as RoadmapFiltersValue,
} from "../../types/roadmap";
import { useAppConfirm } from "../../hooks/useAppConfirm";
import { RoadmapFilters } from "../../components/roadmap/RoadmapFilters";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

function RoadmapPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<RoadmapFiltersValue>({ search: "" });
  const [pagination, setPagination] = useState({ skip: 0, take: 10 });
  const debouncedSearch = useDebouncedValue(filters.search);
  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [debouncedSearch, filters],
  );
  const {
    data: roadmapResponse,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useRoadmapFeatureList(queryFilters, pagination);

  const roadmapFeatures = roadmapResponse?.items ?? [];
  const totalRecords = roadmapResponse?.total ?? 0;
  const { confirm } = useAppConfirm();

  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const [editingFeature, setEditingFeature] = useState<RoadmapFeature | null>(
    null,
  );
  const createRoadmapFeatureMutation = useCreateRoadmapFeature();
  const updateRoadmapFeatureMutation = useUpdateRoadmapFeature();
  const deleteRoadmapFeatureMutation = useDeleteRoadmapFeature();

  function handleCreateRoadmapFeature(input: RoadmapFeatureCreateInput) {
    createRoadmapFeatureMutation.mutate(input, {
      onSuccess: () => setIsCreateDialogVisible(false),
    });
  }

  function handleUpdateRoadmapFeature(input: RoadmapFeatureCreateInput) {
    if (!editingFeature) return;

    updateRoadmapFeatureMutation.mutate(
      { featureId: editingFeature.id, input },
      {
        onSuccess: () => setEditingFeature(null),
      },
    );
  }

  function handleDeleteRoadmapFeature(feature: RoadmapFeature) {
    confirm({
      acceptLabel: t("common.delete"),
      header: t("roadmap.delete.header"),
      message: t("roadmap.delete.message"),
      onAccept: () => deleteRoadmapFeatureMutation.mutate(feature.id),
    });
  }

  function handlePageChange(newPagination: PaginationParams) {
    setPagination(newPagination);
  }

  function handleFiltersChange(nextFilters: RoadmapFiltersValue) {
    setFilters(nextFilters);
    setPagination((current) => ({ ...current, skip: 0 }));
  }

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: t("roadmap.addFeature") }}
        onAction={() => setIsCreateDialogVisible(true)}
        eyebrow={t("roadmap.eyebrow")}
        subtitle={t("roadmap.page.subtitle")}
        title={t("roadmap.page.title")}
      />
      <RoadmapSummaryGrid summaries={roadmapSummaries} />

      <RoadmapFilters value={filters} onChange={handleFiltersChange} />

      {isLoading ? (
        <LoadingState message={t("roadmap.loading")} />
      ) : isError ? (
        <ErrorState
          title={t("roadmap.listLoadErrorTitle")}
          message={t("roadmap.listLoadErrorMessage")}
          onRetry={() => void refetch()}
        />
      ) : (
        <RoadmapBoard
          emptyMessage={t("roadmap.empty")}
          features={roadmapFeatures}
          onDeleteFeature={handleDeleteRoadmapFeature}
          onEditFeature={setEditingFeature}
          onPageChange={handlePageChange}
          rows={pagination.take}
          first={pagination.skip}
          statuses={roadmapStatuses}
          totalRecords={totalRecords}
        />
      )}

      <RoadmapFeatureFormDialog
        isSubmitting={createRoadmapFeatureMutation.isPending}
        mode="create"
        onHide={() => setIsCreateDialogVisible(false)}
        onSubmit={handleCreateRoadmapFeature}
        visible={isCreateDialogVisible}
      />

      <RoadmapFeatureFormDialog
        initialValue={editingFeature ?? undefined}
        isSubmitting={updateRoadmapFeatureMutation.isPending}
        mode="edit"
        onHide={() => setEditingFeature(null)}
        onSubmit={handleUpdateRoadmapFeature}
        visible={Boolean(editingFeature)}
      />
    </>
  );
}

export { RoadmapPage };
