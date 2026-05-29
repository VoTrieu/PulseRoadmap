import type { ButtonProps } from "primereact/button";
import type { TagProps } from "primereact/tag";
import type {
  CustomerTier,
  FeedbackCreateInput,
  FeedbackSentiment,
  FeedbackUrgency,
} from "../types/feedback";

const FEEDBACK_PRODUCT_AREAS = [
  "Admin",
  "Roadmap",
  "AI",
  "Analytics",
  "Releases",
];
const FEEDBACK_SENTIMENTS: FeedbackSentiment[] = [
  "Positive",
  "Neutral",
  "Negative",
];
const CUSTOMER_TIERS: CustomerTier[] = ["Enterprise", "Growth", "Startup"];
const FEEDBACK_URGENCIES: FeedbackUrgency[] = ["High", "Medium", "Low"];
const FEEDBACK_SOURCES = ["Customer call", "Portal", "Slack", "Email"];

const FEEDBACK_SENTIMENT_SEVERITY: Record<
  FeedbackSentiment,
  TagProps["severity"]
> = {
  Positive: "success",
  Neutral: "info",
  Negative: "danger",
};

const FEEDBACK_URGENCY_SEVERITY: Record<
  FeedbackUrgency,
  TagProps["severity"]
> = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

const FEEDBACK_ACTION_SEVERITY = {
  edit: "success",
  delete: "danger",
} satisfies Record<string, ButtonProps["severity"]>;

const DEFAULT_FEEDBACK_FORM_VALUE: FeedbackCreateInput = {
  customer: "",
  request: "",
  productArea: "Roadmap",
  sentiment: "Neutral",
  tier: "Growth",
  urgency: "Medium",
  source: "Portal",
  linkedFeature: "",
  receivedAt: "May 18",
};

export {
  CUSTOMER_TIERS,
  DEFAULT_FEEDBACK_FORM_VALUE,
  FEEDBACK_ACTION_SEVERITY,
  FEEDBACK_PRODUCT_AREAS,
  FEEDBACK_SENTIMENT_SEVERITY,
  FEEDBACK_SENTIMENTS,
  FEEDBACK_SOURCES,
  FEEDBACK_URGENCIES,
  FEEDBACK_URGENCY_SEVERITY,
};
