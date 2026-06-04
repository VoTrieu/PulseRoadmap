import type { PaginatedResponse, PaginationParams } from "./pagination";
import type { SummaryItem } from "./summary";

type BugSeverity = "Critical" | "High" | "Medium" | "Low";
type BugStatus = "New" | "Triaging" | "In progress" | "Fixed" | "Closed";

type BugReport = {
  id: string;
  title: string;
  customer: string;
  productArea: string;
  severity: BugSeverity;
  status: BugStatus;
  assignee: string;
  source: string;
  reproductionSteps: string;
  linkedRelease: string;
  reportedAt: string;
};

type BugReportCreateInput = Omit<BugReport, "id">;

type BugReportUpdateInput = Partial<BugReportCreateInput>;

type BugFilters = {
  productArea?: string;
  search: string;
  severity?: BugSeverity;
  status?: BugStatus;
};

type BugReportListResponse = PaginatedResponse<BugReport>;
type BugSummary = SummaryItem;

export type {
  BugFilters,
  BugReport,
  BugReportCreateInput,
  BugReportListResponse,
  BugReportUpdateInput,
  BugSeverity,
  BugStatus,
  BugSummary,
  PaginationParams,
};
