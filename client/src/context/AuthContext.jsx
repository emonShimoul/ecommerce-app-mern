import { createContext, useEffect, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // LOGIN
  const login = async (form) => {
    const res = await API.post("/users/login", form);

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    console.log("logged in");
    
  };

  // REGISTER
  const register = async (form) => {
    await API.post("/users/register", form);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;