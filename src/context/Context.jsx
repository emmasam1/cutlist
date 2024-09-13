import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Add accessToken state

  useEffect(() => {
    console.log("ContextProvider useEffect running...");
    const savedUser = Cookies.get("loggedInUser");
    const savedToken = Cookies.get("accessToken"); // Retrieve accessToken from cookies
    console.log("Saved user cookie:", savedUser);
    console.log("Saved token cookie:", savedToken);

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.phoneNumber) {
          setLoggedInUser(user);
          setAccessToken(savedToken); // Set accessToken if available
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error parsing saved user from cookies:", error);
        Cookies.remove("loggedInUser"); // Clear invalid cookie
        Cookies.remove("accessToken"); // Clear invalid token cookie
      }
    } else {
      console.log("No user cookie found.");
    }
  }, []);

  const login = (userData, token) => {
    if (userData && userData.phoneNumber) {
      setLoggedInUser(userData);
      setAccessToken(token); // Set accessToken
      Cookies.set("loggedInUser", JSON.stringify(userData), { expires: 7, path: '/' });
      Cookies.set("accessToken", token, { expires: 7, path: '/' }); // Save token in cookies
    } else {
      console.error("Invalid user data provided to login function:", userData);
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null); // Clear accessToken
    Cookies.remove("loggedInUser");
    Cookies.remove("accessToken"); // Remove token cookie
  };

  return (
    <Context.Provider value={{ baseUrl, loggedInUser, accessToken, setLoggedInUser, login, logout }}>
      {children}
    </Context.Provider>
  );
};
