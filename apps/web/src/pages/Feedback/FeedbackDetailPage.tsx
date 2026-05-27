import { useParams } from "react-router-dom";
import { useFeedbackDetail } from "../../queries/feedbackQueries";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PageHeader } from "../../components/ui/PageHeader";
import { FeedbackDetailSummary } from "../../components/feedback/FeedbackDetailSummary";

function FeedbackDetailPage() {
  const { feedbackId = "" } = useParams();
  const {
    data: feedback,
    isLoading,
    isError,
    refetch,
  } = useFeedbackDetail(feedbackId);

  if (isLoading) {
    return <LoadingState message="Loading feedback..." />;
  }

  if (isError || !feedback) {
    return (
      <ErrorState
        title="Could not load feedback"
        message="This feedback item may not exist or there was an error loading it. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Feedback"
        title={feedback.request}
        subtitle={feedback.customer}
      />
      <FeedbackDetailSummary feedback={feedback} />
    </>
  );
}

export { FeedbackDetailPage };
