import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
  });

  // Mock login function
  const login = (token) => {
    setAuthState({ isAuthenticated: true, token });
  };

  // Mock logout function
  const logout = () => {
    setAuthState({ isAuthenticated: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
