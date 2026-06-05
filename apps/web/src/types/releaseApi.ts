import type { PaginatedApiResponse } from "./pagination";
import type { ReleaseStatus, ReleaseType } from "./release";

type ReleaseApiItem = {
  id: string;
  name: string;
  version: string;
  status: ReleaseStatus;
  release_type: ReleaseType;
  owner: string;
  target_date: string;
  shipped_at: string | null;
  summary: string;
  internal_notes: string;
  public_notes: string;
  included_feature_ids: string[];
  included_bug_ids: string[];
  is_public: boolean;
};

type ReleaseCreateApiPayload = Omit<ReleaseApiItem, "id">;

type ReleaseUpdateApiPayload = Partial<ReleaseCreateApiPayload>;

type ReleaseListApiResponse = PaginatedApiResponse<ReleaseApiItem>;

export type {
  ReleaseApiItem,
  ReleaseCreateApiPayload,
  ReleaseListApiResponse,
  ReleaseUpdateApiPayload,
};