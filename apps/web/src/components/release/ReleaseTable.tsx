import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";
import {
  RELEASE_ACTION_SEVERITY,
  RELEASE_STATUS_TAG_SEVERITY,
  RELEASE_TYPE_TAG_SEVERITY,
} from "../../constants/releaseConstant";
import type { PaginationParams, Release } from "../../types/release";
import { AppCard } from "../ui/AppCard";
import { PaginatorTable } from "../ui/PaginatorTable";

type ReleaseTableProps = {
  first: number;
  isLoading: boolean;
  onDeleteRelease: (release: Release) => void;
  onEditRelease: (release: Release) => void;
  onPageChange: (params: PaginationParams) => void;
  releases: Release[];
  rows: number;
  totalRecords: number;
};

function ReleaseTable({
  first,
  isLoading,
  onDeleteRelease,
  onEditRelease,
  onPageChange,
  releases,
  rows,
  totalRecords,
}: ReleaseTableProps) {
  const { t } = useTranslation();

  function releaseTemplate(item: Release) {
    return (
      <div>
        <strong className="block text-slate-900">{item.name}</strong>
        <span className="mt-1 block text-xs text-slate-500">
          {item.summary}
        </span>
      </div>
    );
  }

  function statusTemplate(item: Release) {
    return (
      <Tag
        className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
        rounded
        severity={RELEASE_STATUS_TAG_SEVERITY[item.status]}
        value={item.status}
      />
    );
  }

  function typeTemplate(item: Release) {
    return (
      <Tag
        className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
        rounded
        severity={RELEASE_TYPE_TAG_SEVERITY[item.releaseType]}
        value={item.releaseType}
      />
    );
  }

  function itemCountTemplate(item: Release) {
    return t("releases.table.itemsValue", {
      bugs: item.includedBugIds.length,
      features: item.includedFeatureIds.length,
    });
  }

  function visibilityTemplate(item: Release) {
    return (
      <Tag
        className="inline-flex min-h-6 items-center justify-center whitespace-nowrap px-2 py-1 text-xs font-extrabold"
        rounded
        severity={item.isPublic ? "success" : "info"}
        value={
          item.isPublic
            ? t("releases.visibility.public")
            : t("releases.visibility.internal")
        }
      />
    );
  }

  function actionsTemplate(item: Release) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          aria-label={t("common.edit")}
          icon="pi pi-pencil"
          onClick={() => onEditRelease(item)}
          rounded
          severity={RELEASE_ACTION_SEVERITY.edit}
          text
        />
        <Button
          aria-label={t("common.delete")}
          icon="pi pi-trash"
          onClick={() => onDeleteRelease(item)}
          rounded
          severity={RELEASE_ACTION_SEVERITY.delete}
          text
        />
      </div>
    );
  }

  return (
    <AppCard
      compact
      title={t("releases.table.title")}
      subTitle={t("releases.table.subtitle")}
    >
      <PaginatorTable
        data={releases}
        emptyMessage={t("releases.empty")}
        first={first}
        isLoading={isLoading}
        onPageChange={onPageChange}
        rows={rows}
        totalRecords={totalRecords}
      >
        <Column
          body={releaseTemplate}
          header={t("releases.table.release")}
          style={{ minWidth: "24rem" }}
        />
        <Column
          field="version"
          header={t("releases.version")}
          style={{ width: "9rem" }}
        />
        <Column
          body={statusTemplate}
          header={t("releases.status")}
          style={{ width: "8rem" }}
        />
        <Column
          body={typeTemplate}
          header={t("releases.releaseType")}
          style={{ width: "8rem" }}
        />
        <Column
          field="owner"
          header={t("releases.owner")}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="targetDate"
          header={t("releases.targetDate")}
          style={{ width: "8rem" }}
        />
        <Column
          body={itemCountTemplate}
          header={t("releases.table.items")}
          style={{ minWidth: "10rem" }}
        />
        <Column
          body={visibilityTemplate}
          header={t("releases.visibility.label")}
          style={{ width: "8rem" }}
        />
        <Column
          body={actionsTemplate}
          header={t("releases.table.actions")}
          style={{ width: "7rem" }}
        />
      </PaginatorTable>
    </AppCard>
  );
}

export { ReleaseTable };
