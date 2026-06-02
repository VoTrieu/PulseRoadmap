import type { RoadmapPriority, RoadmapStatus } from "./roadmap";

type RoadmapFeatureApiItem = {
  id: string;
  title: string;
  description: string;
  owner: string;
  milestone: string;
  status: RoadmapStatus;
  priority: RoadmapPriority;
  product_area: string;
  linked_feedback_count: number;
  revenue_impact: number;
  effort: number;
  strategic_value: number;
};

type RoadmapFeatureCreateApiPayload = Omit<RoadmapFeatureApiItem, "id">;

type RoadmapFeatureUpdateApiPayload = Partial<RoadmapFeatureCreateApiPayload>;

export type {
  RoadmapFeatureApiItem,
  RoadmapFeatureCreateApiPayload,
  RoadmapFeatureUpdateApiPayload,
};
