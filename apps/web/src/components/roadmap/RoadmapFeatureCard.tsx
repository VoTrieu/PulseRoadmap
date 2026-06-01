import { ProgressBar } from "primereact/progressbar";
import { useTranslation } from "react-i18next";
import { Tag } from "primereact/tag";
import type { TagProps } from "primereact/tag";
import type { RoadmapFeature, RoadmapPriority } from "../../types/roadmap";

type RoadmapFeatureCardProps = {
  feature: RoadmapFeature;
};

const prioritySeverity = {
  High: "danger",
  Medium: "warning",
  Low: "success",
} satisfies Record<RoadmapPriority, TagProps["severity"]>;

function scoreAverage(feature: RoadmapFeature) {
  return Math.round(
    (feature.revenueImpact + feature.strategicValue + (100 - feature.effort)) / 3,
  );
}

function RoadmapFeatureCard({ feature }: RoadmapFeatureCardProps) {
  const { t } = useTranslation();
  const score = scoreAverage(feature);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-950">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {feature.description}
          </p>
        </div>
        <Tag
          className="shrink-0 whitespace-nowrap text-xs font-bold"
          value={feature.priority}
          severity={prioritySeverity[feature.priority]}
          rounded
        />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center justify-between gap-3">
          <span>{t("roadmap.field.owner")}</span>
          <strong className="text-slate-900">{feature.owner}</strong>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span>{t("roadmap.field.milestone")}</span>
          <strong className="text-slate-900">{feature.milestone}</strong>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span>{t("roadmap.field.feedback")}</span>
          <strong className="text-slate-900">{feature.linkedFeedbackCount}</strong>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-medium text-slate-600">{t("roadmap.field.score")}</span>
          <strong className="text-slate-950">{score}</strong>
        </div>
        <ProgressBar className="h-2" value={score} showValue={false} />
      </div>
    </article>
  );
}

export { RoadmapFeatureCard };
