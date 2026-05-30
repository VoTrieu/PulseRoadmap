import type {
  CustomerTier,
  FeedbackSentiment,
  FeedbackUrgency,
} from "./feedback";

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

type FeedbackCreateApiPayload = Omit<FeedbackApiItem, "id">;

type FeedbackUpdateApiPayload = Partial<FeedbackCreateApiPayload>;

type FeedbackListApiResponse = {
  items: FeedbackApiItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

export type {
  FeedbackApiItem,
  FeedbackCreateApiPayload,
  FeedbackListApiResponse,
  FeedbackUpdateApiPayload,
};
