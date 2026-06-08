const authTokenKey = "pulseroadmap.authToken";

function getAuthToken(): string | null {
  return window.localStorage.getItem(authTokenKey);
}

function setAuthToken(token: string): void {
  window.localStorage.setItem(authTokenKey, token);
}

function clearAuthToken(): void {
  window.localStorage.removeItem(authTokenKey);
}

export { clearAuthToken, getAuthToken, setAuthToken };
