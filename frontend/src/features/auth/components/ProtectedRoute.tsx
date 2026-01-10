import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  // Update this to match what the backend actually sends
  allowedRoles: ("STUDENT" | "MENTOR" | "student" | "mentor")[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Convert to uppercase for the check to ensure it matches "MENTOR"
  const userRole = authUser.role.toUpperCase();
  const upperAllowedRoles = allowedRoles.map(role => role.toUpperCase());

  if (!upperAllowedRoles.includes(userRole)) {
    console.warn(`Access Denied: User role ${userRole} not in ${upperAllowedRoles}`);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
