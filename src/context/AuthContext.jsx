import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {email, role}
  const navigate = useNavigate();

  // Login function
  const login = (email, password) => {
    if (email === "admin@site.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      navigate("/admin/dashboard");
    }  else {
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