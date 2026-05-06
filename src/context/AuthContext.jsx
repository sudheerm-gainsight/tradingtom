import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, isAdminEmail } from "../services/api";

const AuthContext = createContext();

const identifyAptrinsic = (user) => {
  if (!window.aptrinsic) return;

  window.aptrinsic("onReady", function () {
    window.aptrinsic(
      "identify",
      {
        id: user.email,
        email: user.email,
        firstName: user.name
      },
      {
        id: "IBM",
        name: "International Business Machine",
        Program: "Platinum"
      }
    );

    console.log("PX Ready + Identify Done");
    // Note: Gainsight PX does not provide a 'getAccountId' getter method.
    // The SDK is designed to send data to Gainsight rather than retrieve state back into your app.
    // Since you are passing "IBM", you can manage this ID directly in your app's state if needed.
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const saved = localStorage.getItem("sessionUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsAdmin(isAdminEmail(parsed.email));
      identifyAptrinsic(parsed);
    }
  }, []);

  const signup = (data) => {
    const res = registerUser(data);
    if (res.error) return res;

    localStorage.setItem("sessionUser", JSON.stringify(data));
    setUser(data);
    setIsAdmin(isAdminEmail(data.email));
    identifyAptrinsic(data);

    return { success: true };
  };

  const login = (email) => {
    const user = loginUser(email);
    if (!user) return { error: "User not found or invalid email" };

    localStorage.setItem("sessionUser", JSON.stringify(user));
    setUser(user);
    setIsAdmin(isAdminEmail(user.email));
    identifyAptrinsic(user);

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