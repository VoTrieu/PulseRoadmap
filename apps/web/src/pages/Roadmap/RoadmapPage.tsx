import { useTranslation } from "react-i18next";
import { RoadmapBoard } from "../../components/roadmap/RoadmapBoard";
import { RoadmapSummaryGrid } from "../../components/roadmap/RoadmapSummaryGrid";
import { PageHeader } from "../../components/ui/PageHeader";
import {
  roadmapFeatures,
  roadmapStatuses,
  roadmapSummaries,
} from "../../data/roadmapSampleData";

function RoadmapPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: t("roadmap.addFeature") }}
        eyebrow={t("roadmap.eyebrow")}
        subtitle={t("roadmap.page.subtitle")}
        title={t("roadmap.page.title")}
      />
      <RoadmapSummaryGrid summaries={roadmapSummaries} />
      <RoadmapBoard features={roadmapFeatures} statuses={roadmapStatuses} />
    </>
  );
}

export { RoadmapPage };
