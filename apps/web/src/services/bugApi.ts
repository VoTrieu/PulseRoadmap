import type {
  BugFilters,
  BugReport,
  BugReportCreateInput,
  BugReportListResponse,
  BugReportUpdateInput,
  PaginationParams,
} from "../types/bug";
import type {
  BugReportApiItem,
  BugReportListApiResponse,
} from "../types/bugApi";
import {
  mapBugReportApiItemToBugReport,
  mapBugReportCreateInputToApiPayload,
  mapBugReportListApiResponseToListResponse,
  mapBugReportUpdateInputToApiPayload,
} from "../mappers/bugMapper";
import { apiClient } from "./apiClient";

async function getBugs(
  filters?: BugFilters,
  pagination?: PaginationParams,
): Promise<BugReportListResponse> {
  const response = await apiClient.get<BugReportListApiResponse>("/bugs", {
    params: toBugQueryParams(filters, pagination),
  });

  return mapBugReportListApiResponseToListResponse(response.data);
}

async function getBugById(id: string): Promise<BugReport> {
  const response = await apiClient.get<BugReportApiItem>(`/bugs/${id}`);
  return mapBugReportApiItemToBugReport(response.data);
}

async function createBug(input: BugReportCreateInput): Promise<BugReport> {
  const response = await apiClient.post<BugReportApiItem>(
    "/bugs",
    mapBugReportCreateInputToApiPayload(input),
  );
  return mapBugReportApiItemToBugReport(response.data);
}

async function updateBug(
  bugId: string,
  input: BugReportUpdateInput,
): Promise<BugReport> {
  const response = await apiClient.patch<BugReportApiItem>(
    `/bugs/${bugId}`,
    mapBugReportUpdateInputToApiPayload(input),
  );
  return mapBugReportApiItemToBugReport(response.data);
}

async function deleteBug(bugId: string): Promise<void> {
  await apiClient.delete(`/bugs/${bugId}`);
}

function toBugQueryParams(filters?: BugFilters, pagination?: PaginationParams) {
  return {
    search: filters?.search.trim() || undefined,
    severity: filters?.severity || undefined,
    status: filters?.status || undefined,
    product_area: filters?.productArea || undefined,
    skip: pagination?.skip ?? 0,
    take: pagination?.take ?? 10,
  };
}

export { createBug, deleteBug, getBugById, getBugs, updateBug };
