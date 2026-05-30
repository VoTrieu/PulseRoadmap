import type { FeedbackListFilters } from "../types/feedback";

const queryKeys = {
  feedback: {
    all: ["feedback"] as const,
    list: (filters?: FeedbackListFilters) =>
      [...queryKeys.feedback.all, "list", filters ?? {}] as const,
    detail: (feedbackId: string) =>
      [...queryKeys.feedback.all, "detail", feedbackId] as const,
  },
};

export { queryKeys };
