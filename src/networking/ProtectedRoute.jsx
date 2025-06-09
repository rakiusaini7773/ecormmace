import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = sessionStorage.getItem("userRole"); // Get role from sessionStorage

  if (!userRole) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect if role is not allowed
  }

  return <Outlet />;
};

export default ProtectedRoute;