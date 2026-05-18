import type { FeedbackItem, Insight, Metric, RoadmapItem, SeverityItem } from "../types/dashboard";

const metrics: Metric[] = [
  { label: "Open feedback", value: "428", change: "+18%", accent: "border-blue-500" },
  { label: "Planned features", value: "36", change: "+7", accent: "border-teal-500" },
  { label: "Critical bugs", value: "9", change: "-3", accent: "border-red-500" },
  { label: "Release velocity", value: "2.8/wk", change: "+0.4", accent: "border-amber-500" }
];

const feedback: FeedbackItem[] = [
  {
    customer: "Northstar Health",
    request: "Bulk workspace role updates",
    area: "Admin",
    tier: "Enterprise",
    urgency: "High"
  },
  {
    customer: "Atlas Cloud",
    request: "Export roadmap as customer-facing PDF",
    area: "Roadmap",
    tier: "Growth",
    urgency: "Medium"
  },
  {
    customer: "BrightDesk",
    request: "Better duplicate feedback detection",
    area: "AI",
    tier: "Startup",
    urgency: "High"
  }
];

const feedbackTrend = [42, 58, 51, 69, 64, 84, 76];

const roadmap: RoadmapItem[] = [
  { name: "Feedback clustering", progress: 82, status: "In progress" },
  { name: "Public changelog", progress: 54, status: "Planned" },
  { name: "Release approval flow", progress: 33, status: "Discovery" }
];

const bugMix: SeverityItem[] = [
  { label: "Critical", value: 9, severity: "danger" },
  { label: "High", value: 18, severity: "warning" },
  { label: "Medium", value: 42, severity: "info" },
  { label: "Low", value: 31, severity: "success" }
];

const insights: Insight[] = [
  {
    title: "Cluster duplicate feedback",
    body: "23 requests mention admin permissions and workspace roles."
  },
  {
    title: "Draft release note",
    body: "Release 2.14 is ready for a customer-facing summary."
  },
  {
    title: "Escalate risk",
    body: "Critical billing bugs affect two enterprise accounts."
  }
];

export { bugMix, feedback, feedbackTrend, insights, metrics, roadmap };
