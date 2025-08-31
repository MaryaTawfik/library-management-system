import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // normalize stored role and allowed roles to lowercase to avoid casing issues
  const userRole = user?.role ? String(user.role).toLowerCase() : null;

  if (roles) {
    const allowed = roles.map((r) => String(r).toLowerCase());
    if (!allowed.includes(userRole)) {
      return <Navigate to="/home" replace />;
    }
  }

  return <Outlet />; // render nested routes
};

export default ProtectedRoute;
