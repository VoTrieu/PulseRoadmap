type AuthTokenResponse = {
  access_token: string;
  token_type: "bearer";
};

type AuthOrganization = {
  id: string;
  name: string;
  slug: string;
  role: "Owner" | "Admin" | "Member";
};

type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  organizations: AuthOrganization[];
};

type CurrentUserApiItem = {
  id: string;
  email: string;
  full_name: string;
  organizations: AuthOrganization[];
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  full_name: string;
  password: string;
  organization_name: string;
};

type CreateOrganizationPayload = {
  name: string;
};

export type {
  AuthOrganization,
  AuthTokenResponse,
  CreateOrganizationPayload,
  CurrentUser,
  CurrentUserApiItem,
  LoginPayload,
  RegisterPayload,
};
