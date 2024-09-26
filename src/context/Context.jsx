import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userBlockedStatus, setUserBlockedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = Cookies.get("loggedInUser");
    const savedToken = Cookies.get("accessToken");

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.phoneNumber) {
          setLoggedInUser(user);
          setAccessToken(savedToken);
          setUserBlockedStatus(user.blockedStatus || "active");
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error parsing saved user from cookies:", error);
        Cookies.remove("loggedInUser");
        Cookies.remove("accessToken");
        navigate("/admin-login");
      }
    } else {
      navigate("/admin-login");
    }

    setIsLoading(false);
  }, [navigate]);

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    Cookies.set(name, value, {
      expires,
      secure: true,
      sameSite: "Strict",
    });
  };

  const login = (userData, token) => {
    setLoggedInUser(userData);
    setAccessToken(token);
    setUserBlockedStatus(userData.blockedStatus || "active");
    setCookie("loggedInUser", JSON.stringify(userData), 30);
    setCookie("accessToken", token, 30);
  };

  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null);
    setUserBlockedStatus("active");
    Cookies.remove("loggedInUser");
    Cookies.remove("accessToken");
    navigate("/admin-login"); // Redirect to admin-login after logout
  };

  // If still loading, don't render children
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider
      value={{
        baseUrl,
        loggedInUser,
        setLoggedInUser,
        accessToken,
        login,
        logout,
        userBlockedStatus,
        setUserBlockedStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
};
