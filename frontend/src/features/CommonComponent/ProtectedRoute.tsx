// src/components/ProtectedRoute.tsx
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAuthLoading, redirection } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && redirection) {
      if (!redirection.is_app_pass_set && !redirection.is_template_set) {
        toast(
          "Your account setup is incomplete. Please configure email and create a template.",
          {
            icon: "🚀",
            style: {
              background: "#EFF6FF",
              color: "#1E40AF",
              border: "1px solid #3B82F6",
            },
            duration: 6000,
          },
        );

        // ✅ Only email config missing
      } else if (!redirection.is_app_pass_set) {
        toast("Email config is not set up yet.", {
          icon: "⚠️",
          style: {
            background: "#FEF3C7",
            color: "#92400E",
            border: "1px solid #F59E0B",
          },
          duration: 5000,
        });
      } else if (!redirection.is_template_set) {
        toast("No email template found. Please create one.", {
          icon: "⚠️",
          style: {
            background: "#FEF3C7",
            color: "#92400E",
            border: "1px solid #F59E0B",
          },
          duration: 5000,
        });
      }
    }

    if (!isAuthLoading && isAuthenticated && redirection) {
      if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/redirect") {
        navigate(redirection.redirect_url, { replace: true });
      }
    }
  }, [isAuthLoading, isAuthenticated, redirection, location.pathname]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
