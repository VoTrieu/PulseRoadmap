import type { PaginatedResponse, PaginationParams } from "./pagination";

type FeedbackSentiment = "Positive" | "Neutral" | "Negative";
type FeedbackUrgency = "High" | "Medium" | "Low";
type CustomerTier = "Enterprise" | "Growth" | "Startup";

type FeedbackInboxItem = {
  id: string;
  customer: string;
  request: string;
  productArea: string;
  sentiment: FeedbackSentiment;
  tier: CustomerTier;
  urgency: FeedbackUrgency;
  source: string;
  linkedFeature: string;
  receivedAt: string;
};

type FeedbackCreateInput = Omit<FeedbackInboxItem, "id">;

type FeedbackUpdateInput = Partial<FeedbackCreateInput>;

type FeedbackListFilters = {
  productArea?: string;
  search: string;
  urgency?: FeedbackUrgency;
};

// Use generic pagination type
type FeedbackListResponse = PaginatedResponse<FeedbackInboxItem>;

type FeedbackSummary = {
  label: string;
  value: string;
  helper: string;
  icon: string;
};

export type {
  CustomerTier,
  FeedbackCreateInput,
  FeedbackInboxItem,
  FeedbackListFilters,
  FeedbackListResponse,
  FeedbackSentiment,
  FeedbackSummary,
  FeedbackUrgency,
  FeedbackUpdateInput,
  PaginationParams,
};
