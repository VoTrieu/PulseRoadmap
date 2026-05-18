import type { FeedbackInboxItem } from "../types/feedback";
import type { FeedbackApiItem } from "../types/feedbackApi";

function mapFeedbackApiItemToInboxItem(item: FeedbackApiItem): FeedbackInboxItem {
  return {
    id: item.id,
    customer: item.customer,
    request: item.request,
    productArea: item.product_area,
    sentiment: item.sentiment,
    tier: item.tier,
    urgency: item.urgency,
    source: item.source,
    linkedFeature: item.linked_feature,
    receivedAt: item.received_at,
  };
}

function mapFeedbackApiItemsToInboxItems(items: FeedbackApiItem[]): FeedbackInboxItem[] {
  return items.map(mapFeedbackApiItemToInboxItem);
}

export { mapFeedbackApiItemToInboxItem, mapFeedbackApiItemsToInboxItems };
