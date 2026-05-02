import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;