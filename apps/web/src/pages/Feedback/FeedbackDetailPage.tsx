import { useParams } from "react-router-dom";
import { useFeedbackDetail } from "../../queries/feedbackQueries";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PageHeader } from "../../components/ui/PageHeader";

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
      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p>
          <strong>Customer:</strong> {feedback.customer}
        </p>
        <p>
          <strong>Product area:</strong> {feedback.productArea}
        </p>
        <p>
          <strong>Tier:</strong> {feedback.tier}
        </p>
        <p>
          <strong>Sentiment:</strong> {feedback.sentiment}
        </p>
        <p>
          <strong>Urgency:</strong> {feedback.urgency}
        </p>
        <p>
          <strong>Source:</strong> {feedback.source}
        </p>
        <p>
          <strong>Linked feature:</strong> {feedback.linkedFeature}
        </p>
        <p>
          <strong>Received:</strong> {feedback.receivedAt}
        </p>
      </section>
    </>
  );
}

export { FeedbackDetailPage };