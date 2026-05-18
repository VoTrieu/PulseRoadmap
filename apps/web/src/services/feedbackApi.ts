import { mapFeedbackApiItemsToInboxItems } from "../mappers/feedbackMapper";
import type { FeedbackInboxItem } from "../types/feedback";
import type { FeedbackApiItem } from "../types/feedbackApi";
import { apiClient } from "./apiClient";

async function getFeedback(): Promise<FeedbackInboxItem[]> {
  const response = await apiClient.get<FeedbackApiItem[]>("/feedback");

  return mapFeedbackApiItemsToInboxItems(response.data);
}

export { getFeedback };
