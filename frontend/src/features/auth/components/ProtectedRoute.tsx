import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  allowedRoles: ("STUDENT" | "MENTOR")[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { authUser } = useAuth();

  // Not logged in
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (!allowedRoles.includes(authUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
