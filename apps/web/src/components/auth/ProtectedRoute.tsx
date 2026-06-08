import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appRoutes } from "../../routes";
import { AuthLoadingScreen } from "./AuthLoadingScreen";

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={appRoutes.login} />;
  }

  return <Outlet />;
}

export { ProtectedRoute };
