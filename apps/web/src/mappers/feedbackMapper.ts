import type {
  FeedbackCreateInput,
  FeedbackInboxItem,
  FeedbackListResponse,
  FeedbackUpdateInput,
} from "../types/feedback";
import type {
  FeedbackApiItem,
  FeedbackCreateApiPayload,
  FeedbackListApiResponse,
  FeedbackUpdateApiPayload,
} from "../types/feedbackApi";
import { mapPaginatedApiResponse } from "./paginationMapper";

function mapFeedbackApiItemToInboxItem(
  item: FeedbackApiItem,
): FeedbackInboxItem {
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

function mapFeedbackApiItemsToInboxItems(
  items: FeedbackApiItem[],
): FeedbackInboxItem[] {
  return items.map(mapFeedbackApiItemToInboxItem);
}

function mapFeedbackListApiResponseToListResponse(
  response: FeedbackListApiResponse,
): FeedbackListResponse {
  return mapPaginatedApiResponse(response, mapFeedbackApiItemToInboxItem);
}

function mapFeedbackCreateInputToApiPayload(
  input: FeedbackCreateInput,
): FeedbackCreateApiPayload {
  return {
    customer: input.customer,
    request: input.request,
    product_area: input.productArea,
    sentiment: input.sentiment,
    tier: input.tier,
    urgency: input.urgency,
    source: input.source,
    linked_feature: input.linkedFeature,
    received_at: input.receivedAt,
  };
}

function mapFeedbackUpdateInputToApiPayload(
  input: FeedbackUpdateInput,
): FeedbackUpdateApiPayload {
  const payload: FeedbackUpdateApiPayload = {};

  if (input.customer !== undefined) payload.customer = input.customer;
  if (input.request !== undefined) payload.request = input.request;
  if (input.productArea !== undefined) payload.product_area = input.productArea;
  if (input.sentiment !== undefined) payload.sentiment = input.sentiment;
  if (input.tier !== undefined) payload.tier = input.tier;
  if (input.urgency !== undefined) payload.urgency = input.urgency;
  if (input.source !== undefined) payload.source = input.source;
  if (input.linkedFeature !== undefined)
    payload.linked_feature = input.linkedFeature;
  if (input.receivedAt !== undefined) payload.received_at = input.receivedAt;

  return payload;
}

export {
  mapFeedbackApiItemToInboxItem,
  mapFeedbackApiItemsToInboxItems,
  mapFeedbackCreateInputToApiPayload,
  mapFeedbackListApiResponseToListResponse,
  mapFeedbackUpdateInputToApiPayload,
};
