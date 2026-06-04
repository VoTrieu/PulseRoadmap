import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BugFilters,
  BugReportCreateInput,
  BugReportUpdateInput,
  PaginationParams,
} from "../types/bug";
import { createBug, deleteBug, getBugById, getBugs, updateBug } from "../services/bugApi";
import { queryKeys } from "./queryKeys";

type UpdateBugVariables = {
  bugId: string;
  input: BugReportUpdateInput;
};

function useBugList(filters?: BugFilters, pagination?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.bugs.list(filters, pagination),
    queryFn: () => getBugs(filters, pagination),
  });
}

function useBugDetail(bugId: string) {
  return useQuery({
    queryKey: queryKeys.bugs.detail(bugId),
    queryFn: () => getBugById(bugId),
    enabled: !!bugId,
  });
}

function useCreateBug() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: BugReportCreateInput) => createBug(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.bugs.all });
    },
  });
}

function useUpdateBug() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bugId, input }: UpdateBugVariables) => updateBug(bugId, input),
    onSuccess: async (_data, { bugId }) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.bugs.all });
      queryClient.removeQueries({ queryKey: queryKeys.bugs.detail(bugId) });
    },
  });
}

function useDeleteBug() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bugId: string) => deleteBug(bugId),
    onSuccess: async (_data, bugId) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.bugs.all });
      queryClient.removeQueries({ queryKey: queryKeys.bugs.detail(bugId) });
    },
  });
}

export { useBugDetail, useBugList, useCreateBug, useDeleteBug, useUpdateBug };
