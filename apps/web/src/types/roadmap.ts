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

type RoadmapSummary = {
  label: string;
  value: string;
  helper: string;
  icon: string;
};

export type { RoadmapFeature, RoadmapPriority, RoadmapStatus, RoadmapSummary };
