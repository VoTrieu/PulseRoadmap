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
import { clearAuthToken, getAuthToken, setAuthToken } from "../services/authToken";
import type { CurrentUser, LoginPayload, RegisterPayload } from "../types/auth";

type AuthContextValue = {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  loginUser: (payload: LoginPayload) => Promise<void>;
  logoutUser: () => void;
  registerUser: (payload: RegisterPayload) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

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
    } catch {
      clearAuthToken();
      setCurrentUser(null);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    void loadCurrentUser();
  }, [loadCurrentUser]);

  const loginUser = useCallback(async (payload: LoginPayload) => {
    const tokenResponse = await login(payload);
    setAuthToken(tokenResponse.access_token);
    const user = await getCurrentUser();
    setCurrentUser(user);
  }, []);

  const registerUser = useCallback(async (payload: RegisterPayload) => {
    const tokenResponse = await register(payload);
    setAuthToken(tokenResponse.access_token);
    const user = await getCurrentUser();
    setCurrentUser(user);
  }, []);

  const logoutUser = useCallback(() => {
    clearAuthToken();
    setCurrentUser(null);
    queryClient.clear();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthenticated: currentUser !== null,
      isInitializing,
      loginUser,
      logoutUser,
      registerUser,
    }),
    [currentUser, isInitializing, loginUser, logoutUser, registerUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
