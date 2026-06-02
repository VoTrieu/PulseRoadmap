import {
  mapRoadmapApiItemsToRoadmapFeatures,
  mapRoadmapFeatureApiItemToRoadmapFeature,
  mapRoadmapFeatureCreateInputToApiPayload,
} from "../mappers/roadmapMapper";
import type {
  RoadmapFeature,
  RoadmapFeatureCreateInput,
  RoadmapFeatureUpdateInput,
} from "../types/roadmap";
import type { RoadmapFeatureApiItem } from "../types/roadmapApi";
import { apiClient } from "./apiClient";

async function getRoadmapFeatures(): Promise<RoadmapFeature[]> {
  const response = await apiClient.get<RoadmapFeatureApiItem[]>("/roadmap");

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
  const response = await apiClient.put<RoadmapFeatureApiItem>(
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

export {
  getRoadmapFeatures,
  getRoadmapFeatureById,
  createRoadmapFeature,
  updateRoadmapFeature,
  deleteRoadmapFeature,
};
