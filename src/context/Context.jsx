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

// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const [userBlockedStatus, setUserBlockedStatus] = useState("");
//   const [isLoading, setIsLoading] = useState(true); // Loading state

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

//     setIsLoading(false); // Mark as loaded
//   }, []);

//   console.log(userBlockedStatus);

//   const farFutureDate = new Date();
//   farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

//   const login = (userData, token) => {
//     setLoggedInUser(userData);
//     setAccessToken(token);
//     setUserBlockedStatus(userData.blockedStatus || "active");
//     Cookies.set("loggedInUser", JSON.stringify(userData), {
//       expires: farFutureDate,
//       secure: true,
//       sameSite: "Strict", // Helps protect against CSRF
//     });
//     Cookies.set("accessToken", token, {
//       expires: farFutureDate,
//       secure: true,
//       sameSite: "Strict",
//     });
//   };

//   const logout = () => {
//     setLoggedInUser(null);
//     setAccessToken(null);
//     setUserBlockedStatus("active");
//     Cookies.remove("loggedInUser");
//     Cookies.remove("accessToken");
//   };

//   // If still loading, don't render children
//   if (isLoading) {
//     return <div>Loading...</div>; // Placeholder for loading screen
//   }

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
import axios from "axios"; // Import axios for API calls

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userBlockedStatus, setUserBlockedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = Cookies.get("loggedInUser");
    const savedToken = Cookies.get("accessToken");

    const validateUser = async (token) => {
      try {
        // Make an API call to validate the user with the saved token
        const response = await axios.get(`${baseUrl}/user/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the saved token
          },
        });

        // If the response is successful, update the user data
        const userData = response.data;
        setLoggedInUser(userData);
        setAccessToken(token);
        setUserBlockedStatus(userData.blockedStatus || "active");
      } catch (error) {
        console.error("Error validating user token:", error);
        logout(); // Log the user out if token validation fails
      } finally {
        setIsLoading(false); // Mark as loaded regardless of success or failure
      }
    };

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.phoneNumber) {
          // Validate the token with the server
          validateUser(savedToken);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error parsing saved user from cookies:", error);
        Cookies.remove("loggedInUser");
        Cookies.remove("accessToken");
        setIsLoading(false); // Mark as loaded if parsing fails
      }
    } else {
      setIsLoading(false); // Mark as loaded if no user or token is found
    }
  }, []);

  const farFutureDate = new Date();
  farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

  const login = (userData, token) => {
    setLoggedInUser(userData);
    setAccessToken(token);
    setUserBlockedStatus(userData.blockedStatus || "active");
    Cookies.set("loggedInUser", JSON.stringify(userData), {
      expires: farFutureDate,
      secure: true,
      sameSite: "Strict", // Helps protect against CSRF
    });
    Cookies.set("accessToken", token, {
      expires: farFutureDate,
      secure: true,
      sameSite: "Strict",
    });
  };

  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null);
    setUserBlockedStatus("active");
    Cookies.remove("loggedInUser");
    Cookies.remove("accessToken");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder for loading screen
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
