import type {
  AuthOrganization,
  CreateOrganizationPayload,
} from "../types/auth";
import { apiClient } from "./apiClient";

async function createOrganization(
  payload: CreateOrganizationPayload,
): Promise<AuthOrganization> {
  const response = await apiClient.post<AuthOrganization>(
    "/organizations",
    payload,
  );

  return response.data;
}

export { createOrganization };
