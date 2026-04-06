// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAuthLoading, redirection } = useAuth();

  if (isAuthLoading) {
    return <p>Loading...</p>; // Or your spinner
  }

  // If user is logged in, send them to their dashboard/config page
  if (isAuthenticated && redirection) {
    return <Navigate to={redirection.redirect_url} replace />;
  }

  return <>{children}</>;
};