import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BUG_ACTION_SEVERITY,
  BUG_SEVERITY_TAG_SEVERITY,
  BUG_STATUS_TAG_SEVERITY,
} from "../../constants/bugConstants";
import type { BugReport, PaginationParams } from "../../types/bug";
import { AppCard } from "../ui/AppCard";
import { PaginatorTable } from "../ui/PaginatorTable";

type BugTableProps = {
  bugs: BugReport[];
  isLoading: boolean;
  onDeleteBug: (bug: BugReport) => void;
  onEditBug: (bug: BugReport) => void;
  onPageChange: (params: PaginationParams) => void;
  rows: number;
  totalRecords: number;
};

function severityTemplate(item: BugReport) {
  return (
    <Tag
      className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
      rounded
      severity={BUG_SEVERITY_TAG_SEVERITY[item.severity]}
      value={item.severity}
    />
  );
}

function statusTemplate(item: BugReport) {
  return (
    <Tag
      className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
      rounded
      severity={BUG_STATUS_TAG_SEVERITY[item.status]}
      value={item.status}
    />
  );
}

function BugTable({
  bugs,
  isLoading,
  onDeleteBug,
  onEditBug,
  onPageChange,
  rows,
  totalRecords,
}: BugTableProps) {
  const { t } = useTranslation();
  const [first, setFirst] = useState(0);

  function titleTemplate(item: BugReport) {
    return (
      <div>
        <strong className="block text-slate-900">{item.title}</strong>
        <span className="mt-1 block text-xs text-slate-500">
          {t("bugs.linkedReleasePrefix")} {item.linkedRelease}
        </span>
      </div>
    );
  }

  function actionsTemplate(item: BugReport) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          aria-label={t("common.edit")}
          icon="pi pi-pencil"
          onClick={() => onEditBug(item)}
          severity={BUG_ACTION_SEVERITY.edit}
          text
          rounded
        />
        <Button
          aria-label={t("common.delete")}
          icon="pi pi-trash"
          onClick={() => onDeleteBug(item)}
          severity={BUG_ACTION_SEVERITY.delete}
          text
          rounded
        />
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
      title={t("bugs.table.title")}
      subTitle={t("bugs.table.subtitle")}
    >
      <PaginatorTable
        data={bugs}
        emptyMessage={t("bugs.empty")}
        first={first}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        rows={rows}
        totalRecords={totalRecords}
      >
        <Column
          body={titleTemplate}
          header={t("bugs.table.bug")}
          style={{ minWidth: "24rem" }}
        />
        <Column
          field="customer"
          header={t("bugs.customer")}
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="productArea"
          header={t("bugs.productArea")}
          style={{ width: "9rem" }}
        />
        <Column
          body={severityTemplate}
          header={t("bugs.severity")}
          style={{ width: "8rem" }}
        />
        <Column
          body={statusTemplate}
          header={t("bugs.status")}
          style={{ width: "9rem" }}
        />
        <Column
          field="assignee"
          header={t("bugs.assignee")}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="source"
          header={t("bugs.source")}
          style={{ width: "9rem" }}
        />
        <Column
          field="reportedAt"
          header={t("bugs.reported")}
          style={{ width: "8rem" }}
        />
        <Column
          body={actionsTemplate}
          header={t("bugs.table.actions")}
          style={{ width: "7rem" }}
        />
      </PaginatorTable>
    </AppCard>
  );
}

export { BugTable };
