import axios from "axios";
import { env } from "../config/env";
import { getActiveOrganizationId } from "./activeOrganization";
import { getAuthToken } from "./authToken";

const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const activeOrganizationId = getActiveOrganizationId();

  if (activeOrganizationId) {
    config.headers["X-Organization-Id"] = activeOrganizationId;
  }

  return config;
});

export { apiClient };
