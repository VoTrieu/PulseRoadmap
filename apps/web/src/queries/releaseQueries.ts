import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRelease,
  deleteRelease,
  getReleaseById,
  getReleases,
  updateRelease,
} from "../services/releaseApi";
import type {
  PaginationParams,
  ReleaseCreateInput,
  ReleaseFilters,
  ReleaseUpdateInput,
} from "../types/release";
import { queryKeys } from "./queryKeys";

type UpdateReleaseVariables = {
  releaseId: string;
  input: ReleaseUpdateInput;
};

function useReleaseList(
  filters?: ReleaseFilters,
  pagination?: PaginationParams,
) {
  return useQuery({
    queryKey: queryKeys.releases.list(filters, pagination),
    queryFn: () => getReleases(filters, pagination),
  });
}

function useReleaseDetail(releaseId: string) {
  return useQuery({
    queryKey: queryKeys.releases.detail(releaseId),
    queryFn: () => getReleaseById(releaseId),
    enabled: !!releaseId,
  });
}

function useCreateRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ReleaseCreateInput) => createRelease(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.releases.all,
      });
    },
  });
}

function useUpdateRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ releaseId, input }: UpdateReleaseVariables) =>
      updateRelease(releaseId, input),
    onSuccess: async (_data, { releaseId }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.releases.all,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.releases.detail(releaseId),
      });
    },
  });
}

function useDeleteRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (releaseId: string) => deleteRelease(releaseId),
    onSuccess: async (_data, releaseId) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.releases.all,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.releases.detail(releaseId),
      });
    },
  });
}

export {
  useCreateRelease,
  useDeleteRelease,
  useReleaseDetail,
  useReleaseList,
  useUpdateRelease,
};