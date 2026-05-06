import { createContext, useContext, useState } from "react";
import { loginUser, registerUser, isAdminEmail } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  //  FINAL IDENTIFY FUNCTION
  const identifyUser = (userData) => {
    if (!window.aptrinsic || !userData) return;

    setTimeout(() => {
      window.aptrinsic("identify",
        {
          id: userData.email,
          email: userData.email,
          firstName: userData.name || "User",
          signUpDate: userData.createdAt || Date.now()
        },
        {
          id: "TradingTom_Community",
          name: "TradingTom Platform"
        }
      );

      console.log("PX Identify Triggered");
    }, 500);
  };

  const signup = (data) => {
    const res = registerUser(data);
    if (res.error) return res;

    localStorage.setItem("sessionUser", JSON.stringify(data));
    setUser(data);
    setIsAdmin(isAdminEmail(data.email));

    identifyUser(data); //  ONLY HERE

    return { success: true };
  };

  const login = (email) => {
    const user = loginUser(email);
    if (!user) return { error: "User not found or invalid email" };

    localStorage.setItem("sessionUser", JSON.stringify(user));
    setUser(user);
    setIsAdmin(isAdminEmail(user.email));

    identifyUser(user); //  ONLY HERE

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("sessionUser");
    setUser(null);
    setIsAdmin(false);

    if (window.aptrinsic) {
      window.aptrinsic("reset");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);