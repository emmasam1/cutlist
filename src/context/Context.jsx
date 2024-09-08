import React, { createContext, useContext, useState } from 'react';

// Create context for base URL and user details
const Conext = createContext();

// Custom hook for accessing the context
export const useConext = () => useContext(Conext);

export const Context = ({ children }) => {
  const [baseURL] = useState('https://cutlist.onrender.com/api/v1'); // your base URL
  const [user, setUser] = useState(null); // stores logged-in user details
  
  // Simulate a login to set user details (you can replace this with actual login logic)
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Conext.Provider value={{ baseURL, user, login, logout }}>
      {children}
    </Conext.Provider>
  );
};
