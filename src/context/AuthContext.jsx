import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {email, role}
  const navigate = useNavigate();

  // Login function
  const login = (email, password) => {
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      navigate("/admin/dashboard");
    } else if (email === "sales@example.com" && password === "sales123") {
      setUser({ email, role: "sales" });
      navigate("/sales/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);