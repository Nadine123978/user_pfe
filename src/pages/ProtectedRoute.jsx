// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, roles, userRole }) {
  if (!roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
