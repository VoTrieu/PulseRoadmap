import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFeedback, getFeedback, getFeedbackById } from "../services/feedbackApi";
import type { FeedbackCreateInput } from "../types/feedback";
import { queryKeys } from "./queryKeys";

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

export { useCreateFeedback, useFeedbackList, useFeedbackDetail };
