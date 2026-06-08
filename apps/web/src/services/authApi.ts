import { mapCurrentUser } from "../mappers/authMapper";
import type {
  AuthTokenResponse,
  CurrentUser,
  CurrentUserApiItem,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";
import { apiClient } from "./apiClient";

async function login(payload: LoginPayload): Promise<AuthTokenResponse> {
  const response = await apiClient.post<AuthTokenResponse>("/auth/login", payload);

  return response.data;
}

async function register(payload: RegisterPayload): Promise<AuthTokenResponse> {
  const response = await apiClient.post<AuthTokenResponse>(
    "/auth/register",
    payload,
  );

  return response.data;
}

async function getCurrentUser(): Promise<CurrentUser> {
  const response = await apiClient.get<CurrentUserApiItem>("/auth/me");

  return mapCurrentUser(response.data);
}

export { getCurrentUser, login, register };
