import { useTranslation } from "react-i18next";
import { AppCard } from "../ui/AppCard";

type FeedbackTrendCardProps = {
  values: number[];
};

function FeedbackTrendCard({ values }: FeedbackTrendCardProps) {
  const { t } = useTranslation();

  return (
    <AppCard
      title={t("dashboard.feedbackTrend.title")}
      subTitle={t("dashboard.feedbackTrend.subtitle")}
    >
      <div className="grid h-44 grid-cols-7 items-end gap-3 border-t border-slate-100 pt-5">
        {values.map((height, index) => (
          <div
            aria-label={`${t("dashboard.feedbackTrend.weekLabel")} ${index + 1}: ${height}`}
            className="rounded-t-lg bg-linear-to-t from-teal-500 to-blue-600"
            key={`${height}-${index}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </AppCard>
  );
}

export { FeedbackTrendCard };
