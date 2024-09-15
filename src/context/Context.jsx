// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null); // Add accessToken state

//   useEffect(() => {
//     // console.log("ContextProvider useEffect running...");
//     const savedUser = Cookies.get("loggedInUser");
//     const savedToken = Cookies.get("accessToken"); // Retrieve accessToken from cookies
//     // console.log("Saved user cookie:", savedUser);
//     // console.log("Saved token cookie:", savedToken);

//     if (savedUser) {
//       try {
//         const user = JSON.parse(savedUser);
//         if (user && user.phoneNumber) {
//           setLoggedInUser(user);
//           setAccessToken(savedToken); // Set accessToken if available
//         } else {
//           throw new Error("Invalid user data");
//         }
//       } catch (error) {
//         // console.error("Error parsing saved user from cookies:", error);
//         Cookies.remove("loggedInUser"); // Clear invalid cookie
//         Cookies.remove("accessToken"); // Clear invalid token cookie
//       }
//     } else {
//       console.log("No user cookie found.");
//     }
//   }, []);

//   const login = (userData, token) => {
//     if (userData && userData.phoneNumber) {
//       setLoggedInUser(userData);
//       setAccessToken(token); // Set accessToken
//       Cookies.set("loggedInUser", JSON.stringify(userData), { expires: 7, path: '/' });
//       Cookies.set("accessToken", token, { expires: 7, path: '/' }); // Save token in cookies
//     } else {
//       console.error("Invalid user data provided to login function:", userData);
//     }
//   };

//   const logout = () => {
//     setLoggedInUser(null);
//     setAccessToken(null); // Clear accessToken
//     Cookies.remove("loggedInUser");
//     Cookies.remove("accessToken"); // Remove token cookie
//   };

//   return (
//     <Context.Provider value={{ baseUrl, loggedInUser, accessToken, setLoggedInUser, login, logout }}>
//       {children}
//     </Context.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Add accessToken state
  const [userBlockedStatus, setUserBlockedStatus] = useState(null); // Add accessToken state

  useEffect(() => {
    // Retrieve user and token from cookies
    const savedUser = Cookies.get("loggedInUser");
    const savedToken = Cookies.get("accessToken");

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        // Verify the user data
        if (user && user.phoneNumber) {
          setLoggedInUser(user);
          setAccessToken(savedToken); // Set accessToken if available
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error parsing saved user from cookies:", error);
        // Clear invalid cookies
        Cookies.remove("loggedInUser");
        Cookies.remove("accessToken");
      }
    } else {
      console.log("No user or token cookie found.");
    }
  }, []);

  const login = (userData, token) => {
    if (userData && userData.phoneNumber && token) {
      setLoggedInUser(userData);
      setAccessToken(token);
      Cookies.set("loggedInUser", JSON.stringify(userData), { expires: 7, path: '/' });
      Cookies.set("userBlockedStatus", JSON.stringify(userData), { expires: 7, path: '/' });
      Cookies.set("accessToken", token, { expires: 7, path: '/' });
    } else {
      console.error("Invalid user data or token provided to login function:", userData, token);
    }
  };

  console.log(userBlockedStatus)

  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null);
    Cookies.remove("loggedInUser");
    Cookies.remove("accessToken");
  };

  return (
    <Context.Provider value={{ baseUrl, loggedInUser, accessToken, userBlockedStatus, setLoggedInUser, login, logout, setUserBlockedStatus }}>
      {children}
    </Context.Provider>
  );
};
