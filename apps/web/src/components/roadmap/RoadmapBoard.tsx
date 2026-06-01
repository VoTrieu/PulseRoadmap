import type { RoadmapFeature, RoadmapStatus } from "../../types/roadmap";
import { RoadmapFeatureCard } from "./RoadmapFeatureCard";

type RoadmapBoardProps = {
  features: RoadmapFeature[];
  statuses: RoadmapStatus[];
};

function RoadmapBoard({ features, statuses }: RoadmapBoardProps) {
  return (
    <section className="mt-4 grid gap-4 xl:grid-cols-4">
      {statuses.map((status) => {
        const statusFeatures = features.filter((feature) => feature.status === status);

        return (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3" key={status}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase text-slate-700">{status}</h2>
              <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-500">
                {statusFeatures.length}
              </span>
            </div>
            <div className="grid gap-3">
              {statusFeatures.map((feature) => (
                <RoadmapFeatureCard feature={feature} key={feature.id} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

export { RoadmapBoard };
