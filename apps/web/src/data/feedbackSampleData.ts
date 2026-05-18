import type { FeedbackInboxItem, FeedbackSummary } from "../types/feedback";

const feedbackSummaries: FeedbackSummary[] = [
  {
    label: "Untriaged feedback",
    value: "84",
    helper: "12 need review today",
    icon: "pi pi-inbox"
  },
  {
    label: "Duplicate clusters",
    value: "19",
    helper: "AI found 6 new matches",
    icon: "pi pi-clone"
  },
  {
    label: "Enterprise requests",
    value: "137",
    helper: "42% of open feedback",
    icon: "pi pi-building"
  }
];

const feedbackInbox: FeedbackInboxItem[] = [
  {
    id: "fb-1001",
    customer: "Northstar Health",
    request: "Bulk workspace role updates for admin teams",
    productArea: "Admin",
    sentiment: "Neutral",
    tier: "Enterprise",
    urgency: "High",
    source: "Customer call",
    linkedFeature: "Workspace role management",
    receivedAt: "May 18"
  },
  {
    id: "fb-1002",
    customer: "Atlas Cloud",
    request: "Export roadmap as customer-facing PDF",
    productArea: "Roadmap",
    sentiment: "Positive",
    tier: "Growth",
    urgency: "Medium",
    source: "Portal",
    linkedFeature: "Public roadmap exports",
    receivedAt: "May 17"
  },
  {
    id: "fb-1003",
    customer: "BrightDesk",
    request: "Detect duplicate feedback before product review",
    productArea: "AI",
    sentiment: "Negative",
    tier: "Startup",
    urgency: "High",
    source: "Slack",
    linkedFeature: "Feedback clustering",
    receivedAt: "May 16"
  },
  {
    id: "fb-1004",
    customer: "OrbitOps",
    request: "Filter feedback by account segment and ARR band",
    productArea: "Analytics",
    sentiment: "Neutral",
    tier: "Enterprise",
    urgency: "Medium",
    source: "Email",
    linkedFeature: "Revenue impact scoring",
    receivedAt: "May 15"
  },
  {
    id: "fb-1005",
    customer: "HelioStack",
    request: "Notify CSMs when linked roadmap items ship",
    productArea: "Releases",
    sentiment: "Positive",
    tier: "Growth",
    urgency: "Low",
    source: "Portal",
    linkedFeature: "Release notifications",
    receivedAt: "May 14"
  }
];

export { feedbackInbox, feedbackSummaries };
