import { useMutation, useQuery } from "@tanstack/react-query";
import { generateAiBrief, getAiAssistantContext } from "../services/aiApi";
import type { AiBriefRequest } from "../types/aiAssistant";
import { queryKeys } from "./queryKeys";

function useAiAssistantContext() {
  return useQuery({
    queryKey: queryKeys.ai.context(),
    queryFn: getAiAssistantContext,
  });
}

function useGenerateAiBrief() {
  return useMutation({
    mutationFn: (input: AiBriefRequest) => generateAiBrief(input),
  });
}

export { useAiAssistantContext, useGenerateAiBrief };
