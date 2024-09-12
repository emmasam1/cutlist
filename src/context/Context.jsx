// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const [baseUrl] = useState("https://cutlist.onrender.com/api/v1");
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Retrieve user from cookies when the component mounts
//   useEffect(() => {
//     const savedUser = Cookies.get("loggedInUser");
//     console.log("Retrieved savedUser from cookies:", savedUser);

//     if (savedUser) {
//       try {
//         const user = JSON.parse(savedUser);
//         if (user && user.phoneNumber) {
//           setLoggedInUser(user);
//         } else {
//           throw new Error("Invalid user data");
//         }
//       } catch (error) {
//         console.error("Error parsing saved user from cookies:", error);
//         Cookies.remove("loggedInUser"); // Clear invalid cookie
//       }
//     }
//   }, []);

//   const login = (userData) => {
//     if (userData && userData.phoneNumber) {
//       setLoggedInUser(userData);
//       Cookies.set("loggedInUser", JSON.stringify(userData), { expires: 7 }); // Store in cookies for 7 days
//     } else {
//       console.error("Invalid user data provided to login function:", userData);
//     }
//   };

//   const logout = () => {
//     setLoggedInUser(null);
//     Cookies.remove("loggedInUser");
//   };

//   return (
//     <Context.Provider value={{ baseUrl, loggedInUser, setLoggedInUser, login, logout }}>
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

  useEffect(() => {
    const savedUser = Cookies.get("loggedInUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.phoneNumber) {
          setLoggedInUser(user);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Error parsing saved user from cookies:", error);
        Cookies.remove("loggedInUser"); // Clear invalid cookie
      }
    }
  }, []);

  const login = (userData) => {
    if (userData && userData.phoneNumber) {
      setLoggedInUser(userData);
      Cookies.set("loggedInUser", JSON.stringify(userData), { expires: 7, path: '/' });
    } else {
      console.error("Invalid user data provided to login function:", userData);
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    Cookies.remove("loggedInUser");
  };

  return (
    <Context.Provider value={{ baseUrl, loggedInUser, setLoggedInUser, login, logout }}>
      {children}
    </Context.Provider>
  );
};

