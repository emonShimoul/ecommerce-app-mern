import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // ✅ If already logged in → redirect
  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;