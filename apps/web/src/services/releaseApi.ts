import {
  mapReleaseApiItemToRelease,
  mapReleaseCreateInputToApiPayload,
  mapReleaseListApiResponseToListResponse,
  mapReleaseUpdateInputToApiPayload,
} from "../mappers/releaseMapper";
import type {
  PaginationParams,
  Release,
  ReleaseCreateInput,
  ReleaseFilters,
  ReleaseListResponse,
  ReleaseUpdateInput,
} from "../types/release";
import type {
  ReleaseApiItem,
  ReleaseListApiResponse,
} from "../types/releaseApi";
import { apiClient } from "./apiClient";

async function getReleases(
  filters?: ReleaseFilters,
  pagination?: PaginationParams,
): Promise<ReleaseListResponse> {
  const response = await apiClient.get<ReleaseListApiResponse>("/releases", {
    params: toReleaseQueryParams(filters, pagination),
  });

  return mapReleaseListApiResponseToListResponse(response.data);
}

async function getReleaseById(id: string): Promise<Release> {
  const response = await apiClient.get<ReleaseApiItem>(`/releases/${id}`);
  return mapReleaseApiItemToRelease(response.data);
}

async function createRelease(input: ReleaseCreateInput): Promise<Release> {
  const response = await apiClient.post<ReleaseApiItem>(
    "/releases",
    mapReleaseCreateInputToApiPayload(input),
  );

  return mapReleaseApiItemToRelease(response.data);
}

async function updateRelease(
  releaseId: string,
  input: ReleaseUpdateInput,
): Promise<Release> {
  const response = await apiClient.patch<ReleaseApiItem>(
    `/releases/${releaseId}`,
    mapReleaseUpdateInputToApiPayload(input),
  );

  return mapReleaseApiItemToRelease(response.data);
}

async function deleteRelease(releaseId: string): Promise<void> {
  await apiClient.delete(`/releases/${releaseId}`);
}

function toReleaseQueryParams(
  filters?: ReleaseFilters,
  pagination?: PaginationParams,
) {
  return {
    search: filters?.search.trim() || undefined,
    status: filters?.status || undefined,
    release_type: filters?.releaseType || undefined,
    is_public: filters?.isPublic,
    skip: pagination?.skip ?? 0,
    take: pagination?.take ?? 10,
  };
}

export {
  createRelease,
  deleteRelease,
  getReleaseById,
  getReleases,
  updateRelease,
};