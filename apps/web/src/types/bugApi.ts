import type { BugSeverity, BugStatus } from "./bug";
import type { PaginatedApiResponse } from "./pagination";

type BugReportApiItem = {
  id: string;
  title: string;
  customer: string;
  product_area: string;
  severity: BugSeverity;
  status: BugStatus;
  assignee: string;
  source: string;
  reproduction_steps: string;
  linked_release: string;
  reported_at: string;
};

type BugReportCreateApiPayload = Omit<BugReportApiItem, "id">;

type BugReportUpdateApiPayload = Partial<BugReportCreateApiPayload>;

type BugReportListApiResponse = PaginatedApiResponse<BugReportApiItem>;

export type {
  BugReportApiItem,
  BugReportCreateApiPayload,
  BugReportListApiResponse,
  BugReportUpdateApiPayload,
};
