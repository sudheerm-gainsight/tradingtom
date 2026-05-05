import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, isAdminEmail } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sessionUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsAdmin(isAdminEmail(parsed.email));
    }
  }, []);

  const signup = (data) => {
    const res = registerUser(data);
    if (res.error) return res;

    localStorage.setItem("sessionUser", JSON.stringify(data));
    setUser(data);
    setIsAdmin(isAdminEmail(data.email));

    return { success: true };
  };

  const login = (email) => {
    const user = loginUser(email);
    if (!user) return { error: "User not found or invalid email" };

    localStorage.setItem("sessionUser", JSON.stringify(user));
    setUser(user);
    setIsAdmin(isAdminEmail(user.email));

    //passing user and account objects:
    aptrinsic("identify",
      {
      //User Fields
        "id": "unique-user-id", // Required for logged in app users
        "email": "userEmail@address.com",
        "firstName": "John",
        "lastName": "Smith",
        "signUpDate": 1522697426479, //unix time in ms
        "plan" : "gold", //Custom attributes - please create those custom attributes in Aptrinsic via Account Settings to be tracked.
        "price" : 95.5,
        "userHash": "" // optional transient for HMAC identification
      },
      {
      //Account Fields
        "id":"IBM", //Required
        "name":"International Business Machine",
        "Program": "Platinum" // flat custom attributes
    });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("sessionUser");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);