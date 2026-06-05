import type {
  Release,
  ReleaseCreateInput,
  ReleaseListResponse,
  ReleaseUpdateInput,
} from "../types/release";
import type {
  ReleaseApiItem,
  ReleaseCreateApiPayload,
  ReleaseListApiResponse,
  ReleaseUpdateApiPayload,
} from "../types/releaseApi";
import { mapPaginatedApiResponse } from "./paginationMapper";

function mapReleaseApiItemToRelease(item: ReleaseApiItem): Release {
  return {
    id: item.id,
    name: item.name,
    version: item.version,
    status: item.status,
    releaseType: item.release_type,
    owner: item.owner,
    targetDate: item.target_date,
    shippedAt: item.shipped_at,
    summary: item.summary,
    internalNotes: item.internal_notes,
    publicNotes: item.public_notes,
    includedFeatureIds: item.included_feature_ids,
    includedBugIds: item.included_bug_ids,
    isPublic: item.is_public,
  };
}

function mapReleaseListApiResponseToListResponse(
  response: ReleaseListApiResponse,
): ReleaseListResponse {
  return mapPaginatedApiResponse(response, mapReleaseApiItemToRelease);
}

function mapReleaseCreateInputToApiPayload(
  input: ReleaseCreateInput,
): ReleaseCreateApiPayload {
  return {
    name: input.name,
    version: input.version,
    status: input.status,
    release_type: input.releaseType,
    owner: input.owner,
    target_date: input.targetDate,
    shipped_at: input.shippedAt,
    summary: input.summary,
    internal_notes: input.internalNotes,
    public_notes: input.publicNotes,
    included_feature_ids: input.includedFeatureIds,
    included_bug_ids: input.includedBugIds,
    is_public: input.isPublic,
  };
}

function mapReleaseUpdateInputToApiPayload(
  input: ReleaseUpdateInput,
): ReleaseUpdateApiPayload {
  const payload: ReleaseUpdateApiPayload = {};

  if (input.name !== undefined) payload.name = input.name;
  if (input.version !== undefined) payload.version = input.version;
  if (input.status !== undefined) payload.status = input.status;
  if (input.releaseType !== undefined) payload.release_type = input.releaseType;
  if (input.owner !== undefined) payload.owner = input.owner;
  if (input.targetDate !== undefined) payload.target_date = input.targetDate;
  if (input.shippedAt !== undefined) payload.shipped_at = input.shippedAt;
  if (input.summary !== undefined) payload.summary = input.summary;
  if (input.internalNotes !== undefined)
    payload.internal_notes = input.internalNotes;
  if (input.publicNotes !== undefined) payload.public_notes = input.publicNotes;
  if (input.includedFeatureIds !== undefined)
    payload.included_feature_ids = input.includedFeatureIds;
  if (input.includedBugIds !== undefined)
    payload.included_bug_ids = input.includedBugIds;
  if (input.isPublic !== undefined) payload.is_public = input.isPublic;

  return payload;
}

export {
  mapReleaseApiItemToRelease,
  mapReleaseCreateInputToApiPayload,
  mapReleaseListApiResponseToListResponse,
  mapReleaseUpdateInputToApiPayload,
};