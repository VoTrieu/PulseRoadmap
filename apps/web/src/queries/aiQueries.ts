import { useMutation } from "@tanstack/react-query";
import { generateAiBrief } from "../services/aiApi";
import type { AiBriefRequest } from "../types/aiAssistant";

function useGenerateAiBrief() {
  return useMutation({
    mutationFn: (input: AiBriefRequest) => generateAiBrief(input),
  });
}

export { useGenerateAiBrief };
