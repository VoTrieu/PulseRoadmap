import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RoadmapBoard } from "../../components/roadmap/RoadmapBoard";
import { RoadmapSummaryGrid } from "../../components/roadmap/RoadmapSummaryGrid";
import { PageHeader } from "../../components/ui/PageHeader";
import {
  useRoadmapFeatureList,
  useCreateRoadmapFeature,
  useUpdateRoadmapFeature,
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

function RoadmapPage() {
  const { t } = useTranslation();
  const {
    data: roadmapFeatures = [],
    isError,
    isLoading,
    refetch,
  } = useRoadmapFeatureList();

  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
  const createRoadmapFeatureMutation = useCreateRoadmapFeature();
  const [editingFeature, setEditingFeature] = useState<RoadmapFeature | null>(
    null,
  );
  const updateRoadmapFeatureMutation = useUpdateRoadmapFeature();

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
