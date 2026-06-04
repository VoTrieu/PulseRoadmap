import {
  mapRoadmapApiItemsToRoadmapFeatures,
  mapRoadmapFeatureApiItemToRoadmapFeature,
  mapRoadmapFeatureCreateInputToApiPayload,
} from "../mappers/roadmapMapper";
import type {
  RoadmapFeature,
  RoadmapFeatureCreateInput,
  RoadmapFeatureUpdateInput,
  RoadmapFilters,
} from "../types/roadmap";
import type { RoadmapFeatureApiItem } from "../types/roadmapApi";
import { apiClient } from "./apiClient";

async function getRoadmapFeatures(
  filters?: RoadmapFilters,
): Promise<RoadmapFeature[]> {
  const response = await apiClient.get<RoadmapFeatureApiItem[]>("/roadmap", {
    params: toRoadmapFeatureQueryParams(filters),
  });

  return mapRoadmapApiItemsToRoadmapFeatures(response.data);
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
    mapRoadmapFeatureCreateInputToApiPayload(
      input as RoadmapFeatureCreateInput,
    ),
  );

  return mapRoadmapFeatureApiItemToRoadmapFeature(response.data);
}

async function deleteRoadmapFeature(roadmapFeatureId: string): Promise<void> {
  await apiClient.delete(`/roadmap/${roadmapFeatureId}`);
}

function toRoadmapFeatureQueryParams(filters?: RoadmapFilters) {
  return {
    search: filters?.search.trim() || undefined,
    status: filters?.status || undefined,
    priority: filters?.priority || undefined,
    product_area: filters?.productArea || undefined,
  };
}

export {
  getRoadmapFeatures,
  getRoadmapFeatureById,
  createRoadmapFeature,
  updateRoadmapFeature,
  deleteRoadmapFeature,
};
