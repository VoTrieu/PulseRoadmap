import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFeedback,
  getFeedback,
  getFeedbackById,
  deleteFeedback,
  updateFeedback,
} from "../services/feedbackApi";
import type {
  FeedbackCreateInput,
  FeedbackUpdateInput,
} from "../types/feedback";
import { queryKeys } from "./queryKeys";

type UpdateFeedbackVariables = {
  feedbackId: string;
  input: FeedbackUpdateInput;
};

function useFeedbackList() {
  return useQuery({
    queryKey: queryKeys.feedback.list(),
    queryFn: getFeedback,
  });
}

function useFeedbackDetail(feedbackId: string) {
  return useQuery({
    queryKey: queryKeys.feedback.detail(feedbackId),
    queryFn: () => getFeedbackById(feedbackId),
    enabled: !!feedbackId,
  });
}

function useCreateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: FeedbackCreateInput) => createFeedback(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.feedback.all,
      });
    },
  });
}

function useUpdateFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedbackId, input }: UpdateFeedbackVariables) =>
      updateFeedback(feedbackId, input),
    onSuccess: async (_data, { feedbackId }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.feedback.list(),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.feedback.detail(feedbackId),
      });
    },
  });
}

function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) => deleteFeedback(feedbackId),
    onSuccess: async (_data, feedbackId) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.feedback.all,
      });

      queryClient.removeQueries({
        queryKey: queryKeys.feedback.detail(feedbackId),
      });
    },
  });
}

export {
  useCreateFeedback,
  useFeedbackList,
  useFeedbackDetail,
  useUpdateFeedback,
  useDeleteFeedback,
};
