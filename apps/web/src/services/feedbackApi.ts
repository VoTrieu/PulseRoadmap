import {
  mapFeedbackApiItemToInboxItem,
  mapFeedbackApiItemsToInboxItems,
  mapFeedbackCreateInputToApiPayload,
  mapFeedbackUpdateInputToApiPayload,
} from "../mappers/feedbackMapper";
import type {
  FeedbackCreateInput,
  FeedbackInboxItem,
  FeedbackListFilters,
  FeedbackUpdateInput,
} from "../types/feedback";
import type { FeedbackApiItem } from "../types/feedbackApi";
import { apiClient } from "./apiClient";

function toFeedbackQueryParams(filters?: FeedbackListFilters) {
  return {
    product_area: filters?.productArea || undefined,
    search: filters?.search.trim() || undefined,
    urgency: filters?.urgency || undefined,
  };
}

async function getFeedback(
  filters?: FeedbackListFilters,
): Promise<FeedbackInboxItem[]> {
  const response = await apiClient.get<FeedbackApiItem[]>("/feedback", {
    params: toFeedbackQueryParams(filters),
  });

  return mapFeedbackApiItemsToInboxItems(response.data);
}

async function getFeedbackById(id: string): Promise<FeedbackInboxItem> {
  const response = await apiClient.get<FeedbackApiItem>(`/feedback/${id}`);

  return mapFeedbackApiItemToInboxItem(response.data);
}

async function createFeedback(
  input: FeedbackCreateInput,
): Promise<FeedbackInboxItem> {
  const response = await apiClient.post<FeedbackApiItem>(
    "/feedback",
    mapFeedbackCreateInputToApiPayload(input),
  );

  return mapFeedbackApiItemToInboxItem(response.data);
}

async function updateFeedback(
  feedbackId: string,
  input: FeedbackUpdateInput,
): Promise<FeedbackInboxItem> {
  const response = await apiClient.patch<FeedbackApiItem>(
    `/feedback/${feedbackId}`,
    mapFeedbackUpdateInputToApiPayload(input),
  );

  return mapFeedbackApiItemToInboxItem(response.data);
}

async function deleteFeedback(id: string): Promise<void> {
  await apiClient.delete(`/feedback/${id}`);
}

export {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
