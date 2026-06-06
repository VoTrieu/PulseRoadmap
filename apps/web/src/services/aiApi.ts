import type { AiBrief, AiBriefRequest } from "../types/aiAssistant";
import { apiClient } from "./apiClient";

async function generateAiBrief(input: AiBriefRequest): Promise<AiBrief> {
  const response = await apiClient.post<AiBrief>("/ai/brief", input);
  return response.data;
}

export { generateAiBrief };
