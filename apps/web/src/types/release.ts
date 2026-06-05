import type { PaginatedResponse, PaginationParams } from "./pagination";
import type { SummaryItem } from "./summary";

type ReleaseStatus = "Planned" | "QA" | "Staged" | "Shipped" | "Canceled";

type ReleaseType = "Major" | "Minor" | "Patch" | "Hotfix";

type Release = {
  id: string;
  name: string;
  version: string;
  status: ReleaseStatus;
  releaseType: ReleaseType;
  owner: string;
  targetDate: string;
  shippedAt: string | null;
  summary: string;
  internalNotes: string;
  publicNotes: string;
  includedFeatureIds: string[];
  includedBugIds: string[];
  isPublic: boolean;
};

type ReleaseCreateInput = Omit<Release, "id">;

type ReleaseUpdateInput = Partial<ReleaseCreateInput>;

type ReleaseFilters = {
  search: string;
  status?: ReleaseStatus;
  releaseType?: ReleaseType;
  isPublic?: boolean;
};

type ReleaseListResponse = PaginatedResponse<Release>;

type ReleaseSummary = SummaryItem;

export type {
  PaginationParams,
  Release,
  ReleaseCreateInput,
  ReleaseFilters,
  ReleaseListResponse,
  ReleaseStatus,
  ReleaseSummary,
  ReleaseType,
  ReleaseUpdateInput,
};