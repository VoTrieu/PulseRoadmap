import {
  mapFeedbackApiItemToInboxItem,
  mapFeedbackApiItemsToInboxItems,
  mapFeedbackCreateInputToApiPayload,
} from "../mappers/feedbackMapper";
import type { FeedbackCreateInput, FeedbackInboxItem } from "../types/feedback";
import type { FeedbackApiItem } from "../types/feedbackApi";
import { apiClient } from "./apiClient";

async function getFeedback(): Promise<FeedbackInboxItem[]> {
  const response = await apiClient.get<FeedbackApiItem[]>("/feedback");

  return mapFeedbackApiItemsToInboxItems(response.data);
}

async function createFeedback(input: FeedbackCreateInput): Promise<FeedbackInboxItem> {
  const response = await apiClient.post<FeedbackApiItem>(
    "/feedback",
    mapFeedbackCreateInputToApiPayload(input),
  );

  return mapFeedbackApiItemToInboxItem(response.data);
}

export { createFeedback, getFeedback };
