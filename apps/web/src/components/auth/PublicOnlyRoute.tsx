import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appRoutes } from "../../routes";
import { AuthLoadingScreen } from "./AuthLoadingScreen";

function PublicOnlyRoute() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate replace to={appRoutes.dashboard} />;
  }

  return <Outlet />;
}

export { PublicOnlyRoute };
