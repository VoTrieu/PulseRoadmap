import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { queryClient } from "../queries/queryClient";
import { getCurrentUser, login, register } from "../services/authApi";
import {
  clearActiveOrganizationId,
  getActiveOrganizationId,
  setActiveOrganizationId as persistActiveOrganizationId,
} from "../services/activeOrganization";
import { clearAuthToken, getAuthToken, setAuthToken } from "../services/authToken";
import { createOrganization } from "../services/organizationApi";
import type {
  CreateOrganizationPayload,
  CurrentUser,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";

type AuthContextValue = {
  activeOrganizationId: string | null;
  currentUser: CurrentUser | null;
  createOrganizationForCurrentUser: (
    payload: CreateOrganizationPayload,
  ) => Promise<void>;
  isAuthenticated: boolean;
  isInitializing: boolean;
  loginUser: (payload: LoginPayload) => Promise<void>;
  logoutUser: () => void;
  registerUser: (payload: RegisterPayload) => Promise<void>;
  setActiveOrganizationId: (organizationId: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [activeOrganizationId, setActiveOrganizationIdState] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const updateActiveOrganization = useCallback((organizationId: string) => {
    persistActiveOrganizationId(organizationId);
    setActiveOrganizationIdState(organizationId);
    queryClient.clear();
  }, []);

  const loadCurrentUser = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setCurrentUser(null);
      setIsInitializing(false);
      return;
    }

    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      const organizationId = resolveActiveOrganizationId(user);

      if (organizationId) {
        updateActiveOrganization(organizationId);
      } else {
        clearActiveOrganizationId();
        setActiveOrganizationIdState(null);
      }
    } catch {
      clearActiveOrganizationId();
      clearAuthToken();
      setActiveOrganizationIdState(null);
      setCurrentUser(null);
    } finally {
      setIsInitializing(false);
    }
  }, [updateActiveOrganization]);

  useEffect(() => {
    void loadCurrentUser();
  }, [loadCurrentUser]);

  const loginUser = useCallback(async (payload: LoginPayload) => {
    const tokenResponse = await login(payload);
    setAuthToken(tokenResponse.access_token);
    const user = await getCurrentUser();
    setCurrentUser(user);
    const organizationId = resolveActiveOrganizationId(user);

    if (organizationId) {
      updateActiveOrganization(organizationId);
    }
  }, [updateActiveOrganization]);

  const registerUser = useCallback(async (payload: RegisterPayload) => {
    const tokenResponse = await register(payload);
    setAuthToken(tokenResponse.access_token);
    const user = await getCurrentUser();
    setCurrentUser(user);
    const organizationId = resolveActiveOrganizationId(user);

    if (organizationId) {
      updateActiveOrganization(organizationId);
    }
  }, [updateActiveOrganization]);

  const createOrganizationForCurrentUser = useCallback(
    async (payload: CreateOrganizationPayload) => {
      const organization = await createOrganization(payload);
      const user = await getCurrentUser();
      setCurrentUser(user);
      updateActiveOrganization(organization.id);
    },
    [updateActiveOrganization],
  );

  const setActiveOrganizationId = useCallback((organizationId: string) => {
    updateActiveOrganization(organizationId);
  }, [updateActiveOrganization]);

  const logoutUser = useCallback(() => {
    clearActiveOrganizationId();
    clearAuthToken();
    setActiveOrganizationIdState(null);
    setCurrentUser(null);
    queryClient.clear();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      activeOrganizationId,
      createOrganizationForCurrentUser,
      isAuthenticated: currentUser !== null,
      isInitializing,
      loginUser,
      logoutUser,
      registerUser,
      setActiveOrganizationId,
    }),
    [
      activeOrganizationId,
      currentUser,
      createOrganizationForCurrentUser,
      isInitializing,
      loginUser,
      logoutUser,
      registerUser,
      setActiveOrganizationId,
      updateActiveOrganization,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function resolveActiveOrganizationId(user: CurrentUser): string | null {
  const storedOrganizationId = getActiveOrganizationId();
  const activeOrganization = user.organizations.find(
    (organization) => organization.id === storedOrganizationId,
  );

  return activeOrganization?.id ?? user.organizations[0]?.id ?? null;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
