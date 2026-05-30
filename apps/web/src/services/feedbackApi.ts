import {
  mapFeedbackApiItemToInboxItem,
  mapFeedbackApiItemsToInboxItems,
  mapFeedbackCreateInputToApiPayload,
  mapFeedbackListApiResponseToListResponse,
  mapFeedbackUpdateInputToApiPayload,
} from "../mappers/feedbackMapper";
import type {
  FeedbackCreateInput,
  FeedbackInboxItem,
  FeedbackListFilters,
  FeedbackListResponse,
  FeedbackUpdateInput,
  PaginationParams,
} from "../types/feedback";
import type { FeedbackApiItem, FeedbackListApiResponse } from "../types/feedbackApi";
import { apiClient } from "./apiClient";

function toFeedbackQueryParams(
  filters?: FeedbackListFilters,
  pagination?: PaginationParams,
) {
  return {
    product_area: filters?.productArea || undefined,
    search: filters?.search.trim() || undefined,
    urgency: filters?.urgency || undefined,
    skip: pagination?.skip ?? 0,
    take: pagination?.take ?? 10,
  };
}

async function getFeedback(
  filters?: FeedbackListFilters,
  pagination?: PaginationParams,
): Promise<FeedbackListResponse> {
  const response = await apiClient.get<FeedbackListApiResponse>("/feedback", {
    params: toFeedbackQueryParams(filters, pagination),
  });

  return mapFeedbackListApiResponseToListResponse(response.data);
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
