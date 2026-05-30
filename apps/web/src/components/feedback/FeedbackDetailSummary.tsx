import { useTranslation } from "react-i18next";
import type { FeedbackInboxItem } from "../../types/feedback";
import { AppCard } from "../ui/AppCard";
import { FeedbackDetailField } from "./FeedbackDetailField";

type FeedbackDetailSummaryProps = {
  feedback: FeedbackInboxItem;
};

function FeedbackDetailSummary({ feedback }: FeedbackDetailSummaryProps) {
  const { t } = useTranslation();

  return (
    <AppCard>
      <dl className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <FeedbackDetailField label={t("feedback.customer")} value={feedback.customer} />
        <FeedbackDetailField label={t("feedback.form.productArea")} value={feedback.productArea} />
        <FeedbackDetailField label={t("feedback.table.tier")} value={feedback.tier} />
        <FeedbackDetailField label={t("feedback.sentiment")} value={feedback.sentiment} />
        <FeedbackDetailField label={t("feedback.urgency")} value={feedback.urgency} />
        <FeedbackDetailField label={t("feedback.source")} value={feedback.source} />
        <FeedbackDetailField label={t("feedback.linkedFeature")} value={feedback.linkedFeature} />
        <FeedbackDetailField label={t("feedback.table.received")} value={feedback.receivedAt} />
      </dl>
    </AppCard>
  );
}

export { FeedbackDetailSummary };
