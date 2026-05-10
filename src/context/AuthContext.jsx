import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, isAdminEmail } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user from localStorage when the app starts or refreshes
  useEffect(() => {
    const savedUser = localStorage.getItem("sessionUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAdmin(isAdminEmail(parsedUser.email));
        identifyUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse session user");
      }
    }
  }, []);


  //  FINAL IDENTIFY FUNCTION
  const identifyUser = (userData) => {
    if (!window.aptrinsic || !userData) return;

    setTimeout(() => {
      window.aptrinsic("identify",
        {
          id: userData.email,
          email: userData.email,
          firstName: userData.name || "User",
          signUpDate: userData.createdAt || Date.now(),
          PhoneNumber: Number(userData.phoneNumber) || 0
        },
        {
          id: "TradingTom_Community",
          name: "TradingTom Platform",
          CompanyStartYear: 2025
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

  const login = (email, phoneNumber) => {
    const user = loginUser(email);
    if (!user) return { error: "User not found or invalid email" };

    const userWithPhone = { ...user, phoneNumber };

    localStorage.setItem("sessionUser", JSON.stringify(userWithPhone));
    setUser(userWithPhone);
    setIsAdmin(isAdminEmail(userWithPhone.email));

    identifyUser(userWithPhone); //  ONLY HERE

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("sessionUser");
    setUser(null);
    setIsAdmin(false);

    // Clear all cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.trim().substr(0, eqPos) : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }

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