import type { RoadmapFeature, RoadmapStatus } from "../../types/roadmap";
import { RoadmapFeatureCard } from "./RoadmapFeatureCard";
import { Paginator } from "primereact/paginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import type { PaginationParams } from "../../types/pagination";

type RoadmapBoardProps = {
  emptyMessage?: string;
  features: RoadmapFeature[];
  statuses: RoadmapStatus[];
  onEditFeature: (feature: RoadmapFeature) => void;
  onDeleteFeature: (feature: RoadmapFeature) => void;
  onPageChange: (params: PaginationParams) => void;
  rows: number;
  first?: number;
  totalRecords: number;
};

function RoadmapBoard({
  features,
  statuses,
  emptyMessage,
  onEditFeature,
  onDeleteFeature,
  onPageChange,
  rows,
  first = 0,
  totalRecords,
}: RoadmapBoardProps) {
  function handlePageChange(event: PaginatorPageChangeEvent) {
    const newFirst = event.first ?? 0;
    const newRows = event.rows ?? rows;

    onPageChange({ skip: newFirst, take: newRows });
  }

  if (!features.length) {
    return (
      <section className="mt-4 rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
        {emptyMessage}
      </section>
    );
  }
  return (
    <>
      <section className="mt-4 grid gap-4 xl:grid-cols-4">
        {statuses.map((status) => {
          const statusFeatures = features.filter(
            (feature) => feature.status === status,
          );
          return (
            <div
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              key={status}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold uppercase text-slate-700">
                  {status}
                </h2>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-500">
                  {statusFeatures.length}
                </span>
              </div>
              <div className="grid gap-3">
                {statusFeatures.map((feature) => (
                  <RoadmapFeatureCard
                    feature={feature}
                    key={feature.id}
                    onEdit={onEditFeature}
                    onDelete={onDeleteFeature}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <Paginator
        className="mt-4"
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        rowsPerPageOptions={[5, 10, 20, 50]}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export { RoadmapBoard };
