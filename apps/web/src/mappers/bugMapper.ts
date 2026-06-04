import type {
  BugReport,
  BugReportCreateInput,
  BugReportListResponse,
  BugReportUpdateInput,
} from "../types/bug";
import type {
  BugReportApiItem,
  BugReportCreateApiPayload,
  BugReportListApiResponse,
  BugReportUpdateApiPayload,
} from "../types/bugApi";
import { mapPaginatedApiResponse } from "./paginationMapper";

function mapBugReportApiItemToBugReport(item: BugReportApiItem): BugReport {
  return {
    id: item.id,
    title: item.title,
    customer: item.customer,
    productArea: item.product_area,
    severity: item.severity,
    status: item.status,
    assignee: item.assignee,
    source: item.source,
    reproductionSteps: item.reproduction_steps,
    linkedRelease: item.linked_release,
    reportedAt: item.reported_at,
  };
}

function mapBugReportListApiResponseToListResponse(
  response: BugReportListApiResponse,
): BugReportListResponse {
  return mapPaginatedApiResponse(response, mapBugReportApiItemToBugReport);
}

function mapBugReportCreateInputToApiPayload(
  input: BugReportCreateInput,
): BugReportCreateApiPayload {
  return {
    title: input.title,
    customer: input.customer,
    product_area: input.productArea,
    severity: input.severity,
    status: input.status,
    assignee: input.assignee,
    source: input.source,
    reproduction_steps: input.reproductionSteps,
    linked_release: input.linkedRelease,
    reported_at: input.reportedAt,
  };
}

function mapBugReportUpdateInputToApiPayload(
  input: BugReportUpdateInput,
): BugReportUpdateApiPayload {
  const payload: BugReportUpdateApiPayload = {};

  if (input.title !== undefined) payload.title = input.title;
  if (input.customer !== undefined) payload.customer = input.customer;
  if (input.productArea !== undefined) payload.product_area = input.productArea;
  if (input.severity !== undefined) payload.severity = input.severity;
  if (input.status !== undefined) payload.status = input.status;
  if (input.assignee !== undefined) payload.assignee = input.assignee;
  if (input.source !== undefined) payload.source = input.source;
  if (input.reproductionSteps !== undefined)
    payload.reproduction_steps = input.reproductionSteps;
  if (input.linkedRelease !== undefined)
    payload.linked_release = input.linkedRelease;
  if (input.reportedAt !== undefined) payload.reported_at = input.reportedAt;

  return payload;
}

export {
  mapBugReportApiItemToBugReport,
  mapBugReportCreateInputToApiPayload,
  mapBugReportListApiResponseToListResponse,
  mapBugReportUpdateInputToApiPayload,
};
