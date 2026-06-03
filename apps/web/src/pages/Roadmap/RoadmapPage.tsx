import { useTranslation } from "react-i18next";
import { RoadmapBoard } from "../../components/roadmap/RoadmapBoard";
import { RoadmapSummaryGrid } from "../../components/roadmap/RoadmapSummaryGrid";
import { PageHeader } from "../../components/ui/PageHeader";
import { useRoadmapFeatureList } from "../../queries/roadmapQueries";
import {
  roadmapStatuses,
  roadmapSummaries,
} from "../../data/roadmapSampleData";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";

function RoadmapPage() {
  const { t } = useTranslation();
  const {
    data: roadmapFeatures = [],
    isError,
    isLoading,
    refetch,
  } = useRoadmapFeatureList();
  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: t("roadmap.addFeature") }}
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
        />
      )}
    </>
  );
}

export { RoadmapPage };
