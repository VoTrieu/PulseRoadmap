import type {
  RoadmapFeatureCreateInput,
  RoadmapPriority,
  RoadmapStatus,
} from "../types/roadmap";

const ROADMAP_STATUSES: RoadmapStatus[] = [
  "Discovery",
  "Planned",
  "In progress",
  "Shipped",
];

const ROADMAP_PRIORITIES: RoadmapPriority[] = ["High", "Medium", "Low"];

const ROADMAP_PRODUCT_AREAS = [
  "Feedback",
  "Roadmap",
  "AI",
  "Analytics",
  "Admin",
  "Releases",
];

const DEFAULT_ROADMAP_FORM_VALUE: RoadmapFeatureCreateInput = {
  title: "",
  description: "",
  owner: "",
  milestone: "",
  status: "Discovery",
  priority: "Medium",
  productArea: "Roadmap",
  linkedFeedbackCount: 0,
  revenueImpact: 50,
  effort: 50,
  strategicValue: 50,
};

export {
  DEFAULT_ROADMAP_FORM_VALUE,
  ROADMAP_PRIORITIES,
  ROADMAP_PRODUCT_AREAS,
  ROADMAP_STATUSES,
};