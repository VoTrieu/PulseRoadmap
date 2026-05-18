import { FeedbackFilters } from "../../components/feedback/FeedbackFilters";
import { FeedbackInboxTable } from "../../components/feedback/FeedbackInboxTable";
import { FeedbackSummaryGrid } from "../../components/feedback/FeedbackSummaryGrid";
import { PageHeader } from "../../components/ui/PageHeader";
import { feedbackInbox, feedbackSummaries } from "../../data/feedbackSampleData";

function FeedbackPage() {
  return (
    <>
      <PageHeader
        action={{ icon: "pi pi-plus", label: "Add feedback" }}
        eyebrow="Feedback"
        subtitle="Triage customer requests, identify duplicate themes, and link feedback to roadmap work."
        title="Customer feedback inbox"
      />

      <FeedbackSummaryGrid summaries={feedbackSummaries} />
      <FeedbackFilters />

      <section className="mt-4">
        <FeedbackInboxTable feedback={feedbackInbox} />
      </section>
    </>
  );
}

export { FeedbackPage };
