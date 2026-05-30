import { ProgressBar } from "primereact/progressbar";
import { useTranslation } from "react-i18next";
import type { RoadmapItem } from "../../types/dashboard";
import { AppCard } from "../ui/AppCard";

type RoadmapProgressCardProps = {
  items: RoadmapItem[];
};

function RoadmapProgressCard({ items }: RoadmapProgressCardProps) {
  const { t } = useTranslation();

  return (
    <AppCard
      title={t("dashboard.roadmapProgress.title")}
      subTitle={t("dashboard.roadmapProgress.subtitle")}
    >
      <div className="grid gap-5">
        {items.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <strong className="text-sm">{item.name}</strong>
              <span className="text-sm text-slate-500">{item.status}</span>
            </div>
            <ProgressBar
              className="h-2"
              value={item.progress}
              showValue={false}
            />
          </div>
        ))}
      </div>
    </AppCard>
  );
}

export { RoadmapProgressCard };
