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

// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const [userBlockedStatus, setUserBlockedStatus] = useState("");
 
//   console.log("from user context", userBlockedStatus)

//   useEffect(() => {
//     const savedUser = Cookies.get("loggedInUser");
//     const savedToken = Cookies.get("accessToken");


//     if (savedUser && savedToken) {
//       try {
//         const user = JSON.parse(savedUser);
//         if (user && user.phoneNumber) {
//           setLoggedInUser(user);
//           setAccessToken(savedToken);
//           setUserBlockedStatus(user.userBlockedStatus || "active"); // Set the status from user data if available
         
//         } else {
//           throw new Error("Invalid user data");
//         }
//       } catch (error) {
//         console.error("Error parsing saved user from cookies:", error);
//         Cookies.remove("loggedInUser");
//         Cookies.remove("accessToken");
//       }
//     } else {
//       console.log("No user or token cookie found.");
//     }
//   }, []);

//   const farFutureDate = new Date();
//   farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

//   const login = (userData, token) => {
//     setLoggedInUser(userData);
//     setAccessToken(token);
//     setUserBlockedStatus(userData.blockedStatus || "active");
//     console.log("from user context", userBlockedStatus)
//     Cookies.set("loggedInUser", JSON.stringify(userData), {
//       expires: farFutureDate,
//     });
//     Cookies.set("accessToken", token, { expires: farFutureDate });
//   };

//   const logout = () => {
//     setLoggedInUser(null);
//     setAccessToken(null);
//     setUserBlockedStatus("active");
//     Cookies.remove("loggedInUser");
//     Cookies.remove("accessToken");
//   };

//   return (
//     <Context.Provider
//       value={{
//         baseUrl,
//         loggedInUser,
//         setLoggedInUser,
//         accessToken,
//         login,
//         logout,
//         userBlockedStatus,
//         setUserBlockedStatus,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

// export const ContextProvider = ({ children }) => {
//   const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const [userBlockedStatus, setUserBlockedStatus] = useState(""); // Track user's blocked status in the context

//   useEffect(() => {
//     const savedUser = Cookies.get("loggedInUser");
//     const savedToken = Cookies.get("accessToken");

//     if (savedUser && savedToken) {
//       try {
//         const user = JSON.parse(savedUser);
//         if (user && user.phoneNumber) {
//           setLoggedInUser(user);
//           setAccessToken(savedToken);
//           setUserBlockedStatus(user.blockedStatus || "active"); // Use 'blockedStatus' instead of 'userBlockedStatus'
//         } else {
//           throw new Error("Invalid user data");
//         }
//       } catch (error) {
//         console.error("Error parsing saved user from cookies:", error);
//         Cookies.remove("loggedInUser");
//         Cookies.remove("accessToken");
//       }
//     }
//   }, []);

//   const farFutureDate = new Date();
//   farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

//   const login = (userData, token) => {
//     setLoggedInUser(userData);
//     setAccessToken(token);
//     setUserBlockedStatus(userData.blockedStatus || "active"); // Make sure the blocked status is set during login
//     Cookies.set("loggedInUser", JSON.stringify(userData), {
//       expires: farFutureDate,
//     });
//     Cookies.set("accessToken", token, { expires: farFutureDate });
//   };

//   const logout = () => {
//     setLoggedInUser(null);
//     setAccessToken(null);
//     setUserBlockedStatus("active"); // Reset blocked status on logout
//     Cookies.remove("loggedInUser");
//     Cookies.remove("accessToken");
//   };

//   return (
//     <Context.Provider
//       value={{
//         baseUrl,
//         loggedInUser,
//         setLoggedInUser,
//         accessToken,
//         login,
//         logout,
//         userBlockedStatus,
//         setUserBlockedStatus,
//       }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

  // import React, { createContext, useState, useEffect } from "react";
  // import Cookies from "js-cookie";

  // export const Context = createContext(); // This is the named export

  // export const ContextProvider = ({ children }) => {
  //   const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
  //   const [loggedInUser, setLoggedInUser] = useState(null);
  //   const [accessToken, setAccessToken] = useState(null);
  //   const [userBlockedStatus, setUserBlockedStatus] = useState("");

  //   useEffect(() => {
  //     const savedUser = Cookies.get("loggedInUser");
  //     const savedToken = Cookies.get("accessToken");

  //     if (savedUser && savedToken) {
  //       try {
  //         const user = JSON.parse(savedUser);
  //         if (user && user.phoneNumber) {
  //           setLoggedInUser(user);
  //           setAccessToken(savedToken);
  //           setUserBlockedStatus(user.blockedStatus || "active");
  //         } else {
  //           throw new Error("Invalid user data");
  //         }
  //       } catch (error) {
  //         console.error("Error parsing saved user from cookies:", error);
  //         Cookies.remove("loggedInUser");
  //         Cookies.remove("accessToken");
  //       }
  //     }
  //   }, []);

  //   const farFutureDate = new Date();
  //   farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

  //   const login = (userData, token) => {
  //     setLoggedInUser(userData);
  //     setAccessToken(token);
  //     setUserBlockedStatus(userData.blockedStatus || "active");
  //     Cookies.set("loggedInUser", JSON.stringify(userData), {
  //       expires: farFutureDate,
  //     });
  //     Cookies.set("accessToken", token, { expires: farFutureDate });
  //   };

  //   const logout = () => {
  //     setLoggedInUser(null);
  //     setAccessToken(null);
  //     setUserBlockedStatus("active");
  //     Cookies.remove("loggedInUser");
  //     Cookies.remove("accessToken");
  //   };

  //   return (
  //     <Context.Provider
  //       value={{
  //         baseUrl,
  //         loggedInUser,
  //         setLoggedInUser,
  //         accessToken,
  //         login,
  //         logout,
  //         userBlockedStatus,
  //         setUserBlockedStatus,
  //       }}
  //     >
  //       {children}
  //     </Context.Provider>
  //   );
  // };


// src/context/Context.js

import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const Context = createContext(); // Named export

export const ContextProvider = ({ children }) => {
  const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userBlockedStatus, setUserBlockedStatus] = useState("");

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
      }
    }
  }, []);

  console.log(userBlockedStatus)

  const farFutureDate = new Date();
  farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

  const login = (userData, token) => {
    setLoggedInUser(userData);
    setAccessToken(token);
    setUserBlockedStatus(userData.blockedStatus || "active");
    Cookies.set("loggedInUser", JSON.stringify(userData), {
      expires: farFutureDate,
      secure: true, // Ensures cookie is sent over HTTPS
      sameSite: 'Strict', // Helps protect against CSRF
    });
    Cookies.set("accessToken", token, { 
      expires: farFutureDate,
      secure: true,
      sameSite: 'Strict',
    });
  };

  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null);
    setUserBlockedStatus("active");
    Cookies.remove("loggedInUser");
    Cookies.remove("accessToken");
  };

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
