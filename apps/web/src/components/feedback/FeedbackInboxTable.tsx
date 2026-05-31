import { useState } from "react";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
import {
  FEEDBACK_SENTIMENT_SEVERITY,
  FEEDBACK_URGENCY_SEVERITY,
} from "../../constants/feedbackConstants";
import { useTranslation } from "react-i18next";
import type { FeedbackInboxItem, PaginationParams } from "../../types/feedback";
import { AppCard } from "../ui/AppCard";
import { PaginatorTable } from "../ui/PaginatorTable";

type FeedbackInboxTableProps = {
  feedback: FeedbackInboxItem[];
  totalRecords: number;
  isLoading: boolean;
  onPageChange: (params: PaginationParams) => void;
  rows: number;
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

function FeedbackInboxTable({
  feedback,
  totalRecords,
  isLoading,
  onPageChange,
  rows,
}: FeedbackInboxTableProps) {
  const { t } = useTranslation();
  const [first, setFirst] = useState(0);

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
          {t("feedback.linkedFeaturePrefix")} {item.linkedFeature}
        </span>
      </div>
    );
  }

  function handlePageChange(params: PaginationParams) {
    setFirst(params.skip);
    onPageChange(params);
  }

  return (
    <AppCard
      compact
      title={t("feedback.inbox.title")}
      subTitle={t("feedback.inbox.subtitle")}
    >
      <PaginatorTable
        data={feedback}
        totalRecords={totalRecords}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        first={first}
        rows={rows}
        emptyMessage={t("feedback.empty")}
      >
        <Column
          header={t("feedback.table.request")}
          body={requestTemplate}
          style={{ minWidth: "22rem" }}
        />
        <Column
          field="customer"
          header={t("feedback.customer")}
          style={{ minWidth: "11rem" }}
        />
        <Column field="productArea" header={t("feedback.table.area")} style={{ width: "8rem" }} />
        <Column field="tier" header={t("feedback.table.tier")} style={{ width: "8rem" }} />
        <Column
          header={t("feedback.sentiment")}
          body={sentimentTemplate}
          style={{ width: "8rem" }}
        />
        <Column
          header={t("feedback.table.urgency")}
          body={urgencyTemplate}
          style={{ width: "7rem" }}
        />
        <Column field="source" header={t("feedback.source")} style={{ width: "9rem" }} />
        <Column field="receivedAt" header={t("feedback.table.received")} style={{ width: "8rem" }} />
      </PaginatorTable>
    </AppCard>
  );
}

export { FeedbackInboxTable };
