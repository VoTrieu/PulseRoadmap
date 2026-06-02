import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  RoadmapFeatureCreateInput,
  RoadmapFeatureUpdateInput,
} from "../types/roadmap";
import { queryKeys } from "./queryKeys";
import {
  createRoadmapFeature,
  deleteRoadmapFeature,
  getRoadmapFeatureById,
  getRoadmapFeatures,
  updateRoadmapFeature,
} from "../services/roadmapApi";

type UpdateRoadmapFeatureVariables = {
  featureId: string;
  input: RoadmapFeatureUpdateInput;
};

function useRoadmapFeatureList() {
  return useQuery({
    queryKey: queryKeys.roadmap.list(),
    queryFn: getRoadmapFeatures,
  });
}

function useRoadmapFeatureDetail(featureId: string) {
  return useQuery({
    queryKey: queryKeys.roadmap.detail(featureId),
    queryFn: () => getRoadmapFeatureById(featureId),
    enabled: !!featureId,
  });
}

function useCreateRoadmapFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RoadmapFeatureCreateInput) =>
      createRoadmapFeature(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.roadmap.all,
      });
    },
  });
}

function useUpdateRoadmapFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ featureId, input }: UpdateRoadmapFeatureVariables) =>
      updateRoadmapFeature(featureId, input),
    onSuccess: async (_data, { featureId }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.roadmap.detail(featureId),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.roadmap.list(),
      });
    },
  });
}

function useDeleteRoadmapFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (featureId: string) => deleteRoadmapFeature(featureId),
    onSuccess: async (_data, featureId) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.roadmap.detail(featureId),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.roadmap.list(),
      });
    },
  });
}

export {
  useRoadmapFeatureList,
  useRoadmapFeatureDetail,
  useCreateRoadmapFeature,
  useUpdateRoadmapFeature,
  useDeleteRoadmapFeature,
};
