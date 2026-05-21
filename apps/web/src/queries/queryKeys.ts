const queryKeys = {
  feedback: {
    all: ["feedback"] as const,
    list: () => [...queryKeys.feedback.all, "list"] as const,
    detail: (feedbackId: string) => [...queryKeys.feedback.all, "detail", feedbackId] as const,
  },
};

export { queryKeys };
