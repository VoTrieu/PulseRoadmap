import type { ButtonProps } from "primereact/button";
import type { TagProps } from "primereact/tag";
import type {
  BugReportCreateInput,
  BugSeverity,
  BugStatus,
} from "../types/bug";

const BUG_SEVERITIES: BugSeverity[] = ["Critical", "High", "Medium", "Low"];

const BUG_STATUSES: BugStatus[] = [
  "New",
  "Triaging",
  "In progress",
  "Fixed",
  "Closed",
];

const BUG_PRODUCT_AREAS = [
  "Admin",
  "Roadmap",
  "AI",
  "Analytics",
  "Releases",
];

const BUG_SOURCES = ["Customer call", "Portal", "Slack", "Email"];

const BUG_SEVERITY_TAG_SEVERITY: Record<BugSeverity, TagProps["severity"]> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "success",
};

const BUG_STATUS_TAG_SEVERITY: Record<BugStatus, TagProps["severity"]> = {
  New: "info",
  Triaging: "warning",
  "In progress": "warning",
  Fixed: "success",
  Closed: "success",
};

const BUG_ACTION_SEVERITY = {
  edit: "success",
  delete: "danger",
} satisfies Record<string, ButtonProps["severity"]>;

const DEFAULT_BUG_FORM_VALUE: BugReportCreateInput = {
  title: "",
  customer: "",
  productArea: "Admin",
  severity: "Medium",
  status: "New",
  assignee: "",
  source: "Portal",
  reproductionSteps: "",
  linkedRelease: "",
  reportedAt: "Jun 04",
};

export {
  BUG_ACTION_SEVERITY,
  BUG_PRODUCT_AREAS,
  BUG_SEVERITIES,
  BUG_SEVERITY_TAG_SEVERITY,
  BUG_SOURCES,
  BUG_STATUSES,
  BUG_STATUS_TAG_SEVERITY,
  DEFAULT_BUG_FORM_VALUE,
};
