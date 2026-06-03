import { useState } from "react";
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
  RoadmapFeature,
  RoadmapFeatureCreateInput,
} from "../../types/roadmap";
import { useAppConfirm } from "../../hooks/useAppConfirm";

function RoadmapPage() {
  const { t } = useTranslation();
  const {
    data: roadmapFeatures = [],
    isError,
    isLoading,
    refetch,
  } = useRoadmapFeatureList();
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
          statuses={roadmapStatuses}
          onEditFeature={setEditingFeature}
          onDeleteFeature={handleDeleteRoadmapFeature}
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
