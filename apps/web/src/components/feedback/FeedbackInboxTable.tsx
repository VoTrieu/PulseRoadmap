import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { AppCard } from "../ui/AppCard";
import type { FeedbackInboxItem } from "../../types/feedback";

type FeedbackInboxTableProps = {
  feedback: FeedbackInboxItem[];
};

function urgencyTemplate(item: FeedbackInboxItem) {
  const severity = item.urgency === "High" ? "danger" : item.urgency === "Medium" ? "warning" : "success";

  return (
    <Tag
      className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
      value={item.urgency}
      severity={severity}
      rounded
    />
  );
}

function sentimentTemplate(item: FeedbackInboxItem) {
  const severity = item.sentiment === "Positive" ? "success" : item.sentiment === "Negative" ? "danger" : "info";

  return (
    <Tag
      className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
      value={item.sentiment}
      severity={severity}
      rounded
    />
  );
}

function requestTemplate(item: FeedbackInboxItem) {
  return (
    <div>
      <strong className="block text-sm text-slate-900">{item.request}</strong>
      <span className="mt-1 block text-xs text-slate-500">Linked to {item.linkedFeature}</span>
    </div>
  );
}

function FeedbackInboxTable({ feedback }: FeedbackInboxTableProps) {
  return (
    <AppCard compact title="Feedback inbox" subTitle="Customer requests ready for product review">
      <DataTable
        className="[&_.p-datatable-tbody>tr]:border-t [&_.p-datatable-tbody>tr]:border-slate-100 [&_.p-datatable-tbody>tr>td]:border-0 [&_.p-datatable-tbody>tr>td]:px-3 [&_.p-datatable-tbody>tr>td]:py-3 [&_.p-datatable-tbody>tr>td]:align-middle [&_.p-datatable-tbody>tr>td]:text-sm [&_.p-datatable-tbody>tr>td]:text-slate-700 [&_.p-datatable-thead>tr>th]:border-0 [&_.p-datatable-thead>tr>th]:bg-slate-50 [&_.p-datatable-thead>tr>th]:px-3 [&_.p-datatable-thead>tr>th]:py-2.5 [&_.p-datatable-thead>tr>th]:text-xs [&_.p-datatable-thead>tr>th]:font-extrabold [&_.p-datatable-thead>tr>th]:uppercase [&_.p-datatable-thead>tr>th]:text-slate-600 [&_.p-datatable-thead>tr>th]:whitespace-nowrap [&_.p-datatable-wrapper]:overflow-x-auto"
        value={feedback}
        size="small"
      >
        <Column header="Request" body={requestTemplate} style={{ minWidth: "22rem" }} />
        <Column field="customer" header="Customer" style={{ minWidth: "11rem" }} />
        <Column field="productArea" header="Area" style={{ width: "8rem" }} />
        <Column field="tier" header="Tier" style={{ width: "8rem" }} />
        <Column header="Sentiment" body={sentimentTemplate} style={{ width: "8rem" }} />
        <Column header="Urgency" body={urgencyTemplate} style={{ width: "7rem" }} />
        <Column field="source" header="Source" style={{ width: "9rem" }} />
        <Column field="receivedAt" header="Received" style={{ width: "8rem" }} />
      </DataTable>
    </AppCard>
  );
}

export { FeedbackInboxTable };
