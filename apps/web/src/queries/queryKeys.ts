import type { FeedbackListFilters, PaginationParams } from "../types/feedback";

const queryKeys = {
  feedback: {
    all: ["feedback"] as const,
    list: (filters?: FeedbackListFilters, pagination?: PaginationParams) =>
      [...queryKeys.feedback.all, "list", filters ?? {}, pagination ?? {}] as const,
    detail: (feedbackId: string) =>
      [...queryKeys.feedback.all, "detail", feedbackId] as const,
  },
};

export { queryKeys };
