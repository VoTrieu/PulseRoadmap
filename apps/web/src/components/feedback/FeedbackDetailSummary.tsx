import type { FeedbackInboxItem } from "../../types/feedback";
import { AppCard } from "../ui/AppCard";
import { FeedbackDetailField } from "./FeedbackDetailField";

type FeedbackDetailSummaryProps = {
  feedback: FeedbackInboxItem;
};

function FeedbackDetailSummary({ feedback }: FeedbackDetailSummaryProps) {
  return (
    <AppCard>
      <dl className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <FeedbackDetailField label="Customer" value={feedback.customer} />
        <FeedbackDetailField label="Product area" value={feedback.productArea} />
        <FeedbackDetailField label="Tier" value={feedback.tier} />
        <FeedbackDetailField label="Sentiment" value={feedback.sentiment} />
        <FeedbackDetailField label="Urgency" value={feedback.urgency} />
        <FeedbackDetailField label="Source" value={feedback.source} />
        <FeedbackDetailField label="Linked feature" value={feedback.linkedFeature} />
        <FeedbackDetailField label="Received" value={feedback.receivedAt} />
      </dl>
    </AppCard>
  );
}

export { FeedbackDetailSummary };
