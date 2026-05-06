import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    // 🔍 Check if a user session exists in localStorage
    const saved = localStorage.getItem("sessionUser");

    if (saved && window.aptrinsic) {
      const user = JSON.parse(saved);

      // 🔥 A 2-second delay ensures the Gainsight PX SDK is fully initialized
      setTimeout(() => {
        window.aptrinsic("identify",
          {
            // Use email as ID for consistency
            id: user.email,
            email: user.email,
            firstName: user.name,
            signUpDate: user.createdAt || Date.now(),
            plan: user.plan || "free"
          },
          {
            // Set the account identity
            id: user.accountId || user.email,
            name: user.companyName || "Individual Account",
            Program: user.plan || "Basic"
          }
        );

        console.log("Gainsight PX Global Identify Done");
        // Verify account ID in console
        console.log("PX Account ID:", window.aptrinsic("getAccountId"));
      }, 2000);
    }
  }, []);

  return <AppRoutes />;
}

export default App;