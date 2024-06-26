// AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);

  const login = (token, userData) => {
    setToken(token);
    setUserData(userData);
  };

  const logout = () => {
    setToken('');
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ token, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
