import type { PaginatedResponse, PaginationParams } from "./pagination";
import type { SummaryItem } from "./summary";

type RoadmapStatus = "Discovery" | "Planned" | "In progress" | "Shipped";

type RoadmapPriority = "High" | "Medium" | "Low";

type RoadmapFeature = {
  id: string;
  title: string;
  description: string;
  owner: string;
  milestone: string;
  status: RoadmapStatus;
  priority: RoadmapPriority;
  productArea: string;
  linkedFeedbackCount: number;
  revenueImpact: number;
  effort: number;
  strategicValue: number;
};

type RoadmapFeatureCreateInput = Omit<RoadmapFeature, "id">;

type RoadmapFeatureUpdateInput = Partial<RoadmapFeatureCreateInput>;

type RoadmapSummary = SummaryItem;

type RoadmapFilters = {
  priority?: RoadmapPriority;
  productArea?: string;
  search: string;
  status?: RoadmapStatus;
};

type RoadmapFeatureListResponse = PaginatedResponse<RoadmapFeature>;

export type {
  RoadmapFeature,
  RoadmapPriority,
  RoadmapStatus,
  RoadmapSummary,
  RoadmapFeatureCreateInput,
  RoadmapFeatureUpdateInput,
  RoadmapFilters,
  RoadmapFeatureListResponse,
  PaginationParams,
};
