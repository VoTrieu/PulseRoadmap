import type { SummaryItem } from "./summary";

type AnalyticsMetric = SummaryItem;

type AnalyticsDistributionItem = {
  label: string;
  value: number;
};

type AnalyticsInsight = {
  label: string;
  helper: string;
  value: string;
};

export type { AnalyticsDistributionItem, AnalyticsInsight, AnalyticsMetric };
