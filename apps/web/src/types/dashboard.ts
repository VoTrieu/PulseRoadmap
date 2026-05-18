import type { TagProps } from "primereact/tag";

type FeedbackItem = {
  customer: string;
  request: string;
  area: string;
  tier: string;
  urgency: "High" | "Medium";
};

type Metric = {
  label: string;
  value: string;
  change: string;
  accent: string;
};

type RoadmapItem = {
  name: string;
  progress: number;
  status: string;
};

type SeverityItem = {
  label: string;
  value: number;
  severity: TagProps["severity"];
};

type Insight = {
  title: string;
  body: string;
};

export type { FeedbackItem, Insight, Metric, RoadmapItem, SeverityItem };
