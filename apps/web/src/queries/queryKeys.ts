import type { FeedbackListFilters, PaginationParams } from "../types/feedback";
import type { BugFilters } from "../types/bug";
import type { RoadmapFilters } from "../types/roadmap";
import type { ReleaseFilters } from "../types/release";

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
  bugs: {
    all: ["bugs"] as const,
    list: (filters?: BugFilters, pagination?: PaginationParams) =>
      [...queryKeys.bugs.all, "list", filters ?? {}, pagination ?? {}] as const,
    detail: (bugId: string) =>
      [...queryKeys.bugs.all, "detail", bugId] as const,
  },
  releases: {
    all: ["releases"] as const,
    list: (filters?: ReleaseFilters, pagination?: PaginationParams) =>
      [
        ...queryKeys.releases.all,
        "list",
        filters ?? {},
        pagination ?? {},
      ] as const,
    detail: (releaseId: string) =>
      [...queryKeys.releases.all, "detail", releaseId] as const,
  },
  ai: {
    all: ["ai"] as const,
    context: () => [...queryKeys.ai.all, "context"] as const,
  },
};

export { queryKeys };
