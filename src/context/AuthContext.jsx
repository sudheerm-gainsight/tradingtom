import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, isAdminEmail } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Helper function to identify the user in Gainsight PX with dynamic data
  const identifyUser = (userData) => {
    if (window.aptrinsic && userData) {
      window.aptrinsic("identify",
        {
          id: userData.id || userData.email,
          email: userData.email,
          firstName: userData.name,
          signUpDate: userData.createdAt || Date.now(),
          plan: userData.plan || "free"
        },
        {
          // id: userData.accountId || userData.email,
          // name: userData.companyName || "Individual",
          // Program: userData.plan || "Basic"
          "id": "IBM",
          "name": "International Business Machine",
          "Program": "Platinum"
        }
      );
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("sessionUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsAdmin(isAdminEmail(parsed.email));

      // Identify the user again on page refresh to maintain tracking
      identifyUser(parsed);
    }
  }, []);

  const signup = (data) => {
    const res = registerUser(data);
    if (res.error) return res;

    localStorage.setItem("sessionUser", JSON.stringify(data));
    setUser(data);
    setIsAdmin(isAdminEmail(data.email));

    // Identify the user in Gainsight PX after a new signup
    identifyUser(data);

    return { success: true };
  };

  const login = (email) => {
    const user = loginUser(email);
    if (!user) return { error: "User not found or invalid email" };

    localStorage.setItem("sessionUser", JSON.stringify(user));
    setUser(user);
    setIsAdmin(isAdminEmail(user.email));

    // Identify the user in Gainsight PX after login
    identifyUser(user);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("sessionUser");
    setUser(null);
    setIsAdmin(false);

    // Reset Gainsight PX tracking on logout
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