import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
