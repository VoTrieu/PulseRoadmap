const activeOrganizationKey = "pulseroadmap.activeOrganizationId";

function getActiveOrganizationId(): string | null {
  return window.localStorage.getItem(activeOrganizationKey);
}

function setActiveOrganizationId(organizationId: string): void {
  window.localStorage.setItem(activeOrganizationKey, organizationId);
}

function clearActiveOrganizationId(): void {
  window.localStorage.removeItem(activeOrganizationKey);
}

export {
  clearActiveOrganizationId,
  getActiveOrganizationId,
  setActiveOrganizationId,
};
