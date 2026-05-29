import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { FEEDBACK_URGENCY_SEVERITY } from "../../constants/feedbackConstants";
import type { FeedbackItem } from "../../types/dashboard";
import { AppCard } from "../ui/AppCard";

type RecentFeedbackCardProps = {
  feedback: FeedbackItem[];
};

function areaTemplate(item: FeedbackItem) {
  return (
    <Tag
      className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
      value={item.area}
      severity="info"
      rounded
    />
  );
}

function urgencyTemplate(item: FeedbackItem) {
  return (
    <Tag
      className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
      value={item.urgency}
      severity={FEEDBACK_URGENCY_SEVERITY[item.urgency]}
      rounded
    />
  );
}

function RecentFeedbackCard({ feedback }: RecentFeedbackCardProps) {
  return (
    <AppCard
      compact
      title="Recent feedback"
      subTitle="Prioritized customer requests"
    >
      <DataTable
        value={feedback}
        size="small"
        stripedRows
      >
        <Column field="request" header="Request" style={{ minWidth: "18rem" }} />
        <Column field="customer" header="Customer" style={{ minWidth: "11rem" }} />
        <Column header="Area" body={areaTemplate} style={{ width: "8.5rem" }} />
        <Column field="tier" header="Tier" style={{ width: "8rem" }} />
        <Column header="Urgency" body={urgencyTemplate} style={{ width: "7rem" }} />
      </DataTable>
    </AppCard>
  );
}

export { RecentFeedbackCard };
