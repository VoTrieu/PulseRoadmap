import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
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
      severity={item.urgency === "High" ? "danger" : "warning"}
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
        className="[&_.p-datatable-tbody>tr]:border-t [&_.p-datatable-tbody>tr]:border-slate-100 [&_.p-datatable-tbody>tr>td]:border-0 [&_.p-datatable-tbody>tr>td]:px-3 [&_.p-datatable-tbody>tr>td]:py-2.5 [&_.p-datatable-tbody>tr>td]:text-sm [&_.p-datatable-tbody>tr>td]:leading-snug [&_.p-datatable-tbody>tr>td]:text-slate-700 [&_.p-datatable-thead>tr>th]:border-0 [&_.p-datatable-thead>tr>th]:bg-slate-50 [&_.p-datatable-thead>tr>th]:px-3 [&_.p-datatable-thead>tr>th]:py-2.5 [&_.p-datatable-thead>tr>th]:text-xs [&_.p-datatable-thead>tr>th]:font-extrabold [&_.p-datatable-thead>tr>th]:uppercase [&_.p-datatable-thead>tr>th]:text-slate-600 [&_.p-datatable-thead>tr>th]:whitespace-nowrap [&_.p-datatable-wrapper]:overflow-x-auto"
        value={feedback}
        size="small"
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
