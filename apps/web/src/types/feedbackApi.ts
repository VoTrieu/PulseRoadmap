import type { CustomerTier, FeedbackSentiment, FeedbackUrgency } from "./feedback";

type FeedbackApiItem = {
  id: string;
  customer: string;
  request: string;
  product_area: string;
  sentiment: FeedbackSentiment;
  tier: CustomerTier;
  urgency: FeedbackUrgency;
  source: string;
  linked_feature: string;
  received_at: string;
};

export type { FeedbackApiItem };
