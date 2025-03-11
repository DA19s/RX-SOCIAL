import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

// Fournir le contexte
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}