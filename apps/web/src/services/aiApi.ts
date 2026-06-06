import type {
  AiAssistantContext,
  AiAssistantContextApiResponse,
  AiBrief,
  AiBriefRequest,
} from "../types/aiAssistant";
import { apiClient } from "./apiClient";

async function getAiAssistantContext(): Promise<AiAssistantContext> {
  const response = await apiClient.get<AiAssistantContextApiResponse>(
    "/ai/context",
  );

  return mapAiAssistantContext(response.data);
}

async function generateAiBrief(input: AiBriefRequest): Promise<AiBrief> {
  const response = await apiClient.post<AiBrief>("/ai/brief", input);
  return response.data;
}

function mapAiAssistantContext(
  response: AiAssistantContextApiResponse,
): AiAssistantContext {
  return {
    totalFeedback: response.total_feedback,
    totalRoadmap: response.total_roadmap,
    totalBugs: response.total_bugs,
    totalReleases: response.total_releases,
    highUrgencyFeedback: response.high_urgency_feedback,
    highPriorityRoadmap: response.high_priority_roadmap,
    criticalBugs: response.critical_bugs,
    publicReleases: response.public_releases,
    topFeedbackArea: response.top_feedback_area,
    nextRelease: response.next_release,
  };
}

export { generateAiBrief, getAiAssistantContext };
