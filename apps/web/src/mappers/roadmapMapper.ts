import type {
  RoadmapFeatureApiItem,
  RoadmapFeatureCreateApiPayload,
  RoadmapFeatureUpdateApiPayload,
  RoadmapFeatureListApiResponse,
} from "../types/roadmapApi";

import type {
  RoadmapFeature,
  RoadmapFeatureCreateInput,
  RoadmapFeatureUpdateInput,
  RoadmapFeatureListResponse,
} from "../types/roadmap";
import { mapPaginatedApiResponse } from "./paginationMapper";

function mapRoadmapFeatureApiItemToRoadmapFeature(
  item: RoadmapFeatureApiItem,
): RoadmapFeature {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    owner: item.owner,
    milestone: item.milestone,
    status: item.status,
    priority: item.priority,
    productArea: item.product_area,
    linkedFeedbackCount: item.linked_feedback_count,
    revenueImpact: item.revenue_impact,
    effort: item.effort,
    strategicValue: item.strategic_value,
  };
}

function mapRoadmapApiItemsToRoadmapFeatures(
  items: RoadmapFeatureApiItem[],
): RoadmapFeature[] {
  return items.map(mapRoadmapFeatureApiItemToRoadmapFeature);
}

function mapRoadmapFeatureCreateInputToApiPayload(
  input: RoadmapFeatureCreateInput,
): RoadmapFeatureCreateApiPayload {
  return {
    title: input.title,
    description: input.description,
    owner: input.owner,
    milestone: input.milestone,
    status: input.status,
    priority: input.priority,
    product_area: input.productArea,
    linked_feedback_count: input.linkedFeedbackCount,
    revenue_impact: input.revenueImpact,
    effort: input.effort,
    strategic_value: input.strategicValue,
  };
}

function mapRoadmapFeatureUpdateInputToApiPayload(
  input: RoadmapFeatureUpdateInput,
): RoadmapFeatureUpdateApiPayload {
  const payload: RoadmapFeatureUpdateApiPayload = {};

  if (input.title !== undefined) payload.title = input.title;
  if (input.description !== undefined) payload.description = input.description;
  if (input.owner !== undefined) payload.owner = input.owner;
  if (input.milestone !== undefined) payload.milestone = input.milestone;
  if (input.status !== undefined) payload.status = input.status;
  if (input.priority !== undefined) payload.priority = input.priority;
  if (input.productArea !== undefined) payload.product_area = input.productArea;
  if (input.linkedFeedbackCount !== undefined)
    payload.linked_feedback_count = input.linkedFeedbackCount;
  if (input.revenueImpact !== undefined)
    payload.revenue_impact = input.revenueImpact;
  if (input.effort !== undefined) payload.effort = input.effort;
  if (input.strategicValue !== undefined)
    payload.strategic_value = input.strategicValue;

  return payload;
}

function mapRoadmapFeatureListApiResponseToListResponse(
  response: RoadmapFeatureListApiResponse,
): RoadmapFeatureListResponse {
  return mapPaginatedApiResponse(
    response,
    mapRoadmapFeatureApiItemToRoadmapFeature,
  );
}

export {
  mapRoadmapFeatureApiItemToRoadmapFeature,
  mapRoadmapApiItemsToRoadmapFeatures,
  mapRoadmapFeatureCreateInputToApiPayload,
  mapRoadmapFeatureUpdateInputToApiPayload,
  mapRoadmapFeatureListApiResponseToListResponse,
};
