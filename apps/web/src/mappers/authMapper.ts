import type { CurrentUser, CurrentUserApiItem } from "../types/auth";

function mapCurrentUser(apiItem: CurrentUserApiItem): CurrentUser {
  return {
    id: apiItem.id,
    email: apiItem.email,
    fullName: apiItem.full_name,
    organizations: apiItem.organizations,
  };
}

export { mapCurrentUser };
