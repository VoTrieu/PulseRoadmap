import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import {
  FEEDBACK_SENTIMENT_SEVERITY,
  FEEDBACK_URGENCY_SEVERITY,
} from "../../constants/feedbackConstants";
import type { FeedbackInboxItem } from "../../types/feedback";
import { AppCard } from "../ui/AppCard";

type FeedbackInboxTableProps = {
  feedback: FeedbackInboxItem[];
};

function urgencyTemplate(item: FeedbackInboxItem) {
  const severity = FEEDBACK_URGENCY_SEVERITY[item.urgency];

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
  const severity = FEEDBACK_SENTIMENT_SEVERITY[item.sentiment];

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
      <Link
        to={`/feedback/${item.id}`}
        className="font-semibold text-slate-900 hover:text-teal-700"
      >
        {item.request}
      </Link>
      <span className="mt-1 block text-xs text-slate-500">
        Linked to {item.linkedFeature}
      </span>
    </div>
  );
}

function FeedbackInboxTable({ feedback }: FeedbackInboxTableProps) {
  return (
    <AppCard
      compact
      title="Feedback inbox"
      subTitle="Customer requests ready for product review"
    >
      <DataTable value={feedback} size="small" stripedRows>
        <Column
          header="Request"
          body={requestTemplate}
          style={{ minWidth: "22rem" }}
        />
        <Column
          field="customer"
          header="Customer"
          style={{ minWidth: "11rem" }}
        />
        <Column field="productArea" header="Area" style={{ width: "8rem" }} />
        <Column field="tier" header="Tier" style={{ width: "8rem" }} />
        <Column
          header="Sentiment"
          body={sentimentTemplate}
          style={{ width: "8rem" }}
        />
        <Column
          header="Urgency"
          body={urgencyTemplate}
          style={{ width: "7rem" }}
        />
        <Column field="source" header="Source" style={{ width: "9rem" }} />
        <Column field="receivedAt" header="Received" style={{ width: "8rem" }} />
      </DataTable>
    </AppCard>
  );
}

export { FeedbackInboxTable };
