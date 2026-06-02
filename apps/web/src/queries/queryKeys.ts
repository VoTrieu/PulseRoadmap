import type { FeedbackListFilters, PaginationParams } from "../types/feedback";

const queryKeys = {
  feedback: {
    all: ["feedback"] as const,
    list: (filters?: FeedbackListFilters, pagination?: PaginationParams) =>
      [
        ...queryKeys.feedback.all,
        "list",
        filters ?? {},
        pagination ?? {},
      ] as const,
    detail: (feedbackId: string) =>
      [...queryKeys.feedback.all, "detail", feedbackId] as const,
  },
  roadmap: {
    all: ["roadmap"] as const,
    list: () => [...queryKeys.roadmap.all, "list"] as const,
    detail: (featureId: string) =>
      [...queryKeys.roadmap.all, "detail", featureId] as const,
  },
};

export { queryKeys };
