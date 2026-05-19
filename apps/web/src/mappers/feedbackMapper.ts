import type { FeedbackCreateInput, FeedbackInboxItem } from "../types/feedback";
import type { FeedbackApiItem, FeedbackCreateApiPayload } from "../types/feedbackApi";

function mapFeedbackApiItemToInboxItem(item: FeedbackApiItem): FeedbackInboxItem {
  return {...item, // Spread operator to copy all properties
    productArea: item.product_area,
    linkedFeature: item.linked_feature,
    receivedAt: item.received_at,
  };
}

function mapFeedbackApiItemsToInboxItems(items: FeedbackApiItem[]): FeedbackInboxItem[] {
  return items.map(mapFeedbackApiItemToInboxItem);
}

function mapFeedbackCreateInputToApiPayload(input: FeedbackCreateInput): FeedbackCreateApiPayload {
  return {...input, // Spread operator to copy all properties
    product_area: input.productArea,
    linked_feature: input.linkedFeature,
    received_at: input.receivedAt,
  };
}

export {
  mapFeedbackApiItemToInboxItem,
  mapFeedbackApiItemsToInboxItems,
  mapFeedbackCreateInputToApiPayload,
};
