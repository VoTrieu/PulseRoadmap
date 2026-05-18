import { AppCard } from "../ui/AppCard";

type FeedbackTrendCardProps = {
  values: number[];
};

function FeedbackTrendCard({ values }: FeedbackTrendCardProps) {
  return (
    <AppCard
      title="Feedback trend"
      subTitle="New customer signals by week"
    >
      <div className="grid h-44 grid-cols-7 items-end gap-3 border-t border-slate-100 pt-5">
        {values.map((height, index) => (
          <div
            aria-label={`Week ${index + 1}: ${height}`}
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
