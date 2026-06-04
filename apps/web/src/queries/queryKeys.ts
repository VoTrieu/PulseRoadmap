import type { FeedbackListFilters, PaginationParams } from "../types/feedback";
import { RoadmapFilters } from "../types/roadmap";

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
    list: (filters?: RoadmapFilters, pagination?: PaginationParams) =>
      [
        ...queryKeys.roadmap.all,
        "list",
        filters ?? {},
        pagination ?? {},
      ] as const,
    detail: (featureId: string) =>
      [...queryKeys.roadmap.all, "detail", featureId] as const,
  },
};

export { queryKeys };
