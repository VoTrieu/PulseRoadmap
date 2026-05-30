import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";
import type { SeverityItem } from "../../types/dashboard";
import { AppCard } from "../ui/AppCard";

type BugSeverityCardProps = {
  items: SeverityItem[];
};

function BugSeverityCard({ items }: BugSeverityCardProps) {
  const { t } = useTranslation();

  return (
    <AppCard
      title={t("dashboard.bugSeverity.title")}
      subTitle={t("dashboard.bugSeverity.subtitle")}
    >
      <div className="grid gap-3">
        {items.map((bug) => (
          <div className="flex items-center justify-between gap-3" key={bug.label}>
            <Tag
              className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
              value={bug.label}
              severity={bug.severity}
              rounded
            />
            <strong>{bug.value}</strong>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

export { BugSeverityCard };
