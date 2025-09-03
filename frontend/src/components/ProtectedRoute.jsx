// src/components/ProtectedRoute.jsx
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userAtom } from "../atoms/authAtom";

export const ProtectedRoute = ({ role, children }) => {
  const [user] = useAtom(userAtom);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    // Unauthorized role
    return <Navigate to="/login" replace />;
  }

  return children;
};
