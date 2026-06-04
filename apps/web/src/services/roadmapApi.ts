import {
  mapRoadmapApiItemsToRoadmapFeatures,
  mapRoadmapFeatureApiItemToRoadmapFeature,
  mapRoadmapFeatureCreateInputToApiPayload,
  mapRoadmapFeatureListApiResponseToListResponse,
  mapRoadmapFeatureUpdateInputToApiPayload,
} from "../mappers/roadmapMapper";
import type {
  RoadmapFeature,
  RoadmapFeatureCreateInput,
  RoadmapFeatureUpdateInput,
  RoadmapFilters,
  RoadmapFeatureListResponse,
  PaginationParams,
} from "../types/roadmap";
import type {
  RoadmapFeatureApiItem,
  RoadmapFeatureListApiResponse,
} from "../types/roadmapApi";
import { apiClient } from "./apiClient";

async function getRoadmapFeatures(
  filters?: RoadmapFilters,
  pagination?: PaginationParams,
): Promise<RoadmapFeatureListResponse> {
  const response = await apiClient.get<RoadmapFeatureListApiResponse>(
    "/roadmap",
    {
      params: toRoadmapFeatureQueryParams(filters, pagination),
    },
  );

  return mapRoadmapFeatureListApiResponseToListResponse(response.data);
}

async function getRoadmapFeatureById(id: string): Promise<RoadmapFeature> {
  const response = await apiClient.get<RoadmapFeatureApiItem>(`/roadmap/${id}`);

  return mapRoadmapFeatureApiItemToRoadmapFeature(response.data);
}

async function createRoadmapFeature(
  input: RoadmapFeatureCreateInput,
): Promise<RoadmapFeature> {
  const response = await apiClient.post<RoadmapFeatureApiItem>(
    "/roadmap",
    mapRoadmapFeatureCreateInputToApiPayload(input),
  );

  return mapRoadmapFeatureApiItemToRoadmapFeature(response.data);
}

async function updateRoadmapFeature(
  roadmapFeatureId: string,
  input: RoadmapFeatureUpdateInput,
): Promise<RoadmapFeature> {
  const response = await apiClient.patch<RoadmapFeatureApiItem>(
    `/roadmap/${roadmapFeatureId}`,
    mapRoadmapFeatureUpdateInputToApiPayload(input),
  );

  return mapRoadmapFeatureApiItemToRoadmapFeature(response.data);
}

async function deleteRoadmapFeature(roadmapFeatureId: string): Promise<void> {
  await apiClient.delete(`/roadmap/${roadmapFeatureId}`);
}

function toRoadmapFeatureQueryParams(
  filters?: RoadmapFilters,
  pagination?: PaginationParams,
) {
  return {
    search: filters?.search.trim() || undefined,
    status: filters?.status || undefined,
    priority: filters?.priority || undefined,
    product_area: filters?.productArea || undefined,
    skip: pagination?.skip ?? 0,
    take: pagination?.take ?? 10,
  };
}

export {
  getRoadmapFeatures,
  getRoadmapFeatureById,
  createRoadmapFeature,
  updateRoadmapFeature,
  deleteRoadmapFeature,
};
