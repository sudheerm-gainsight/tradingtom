import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    // 🔍 Check if a user session exists in localStorage
    const saved = localStorage.getItem("sessionUser");

    if (saved && window.aptrinsic) {
      const user = JSON.parse(saved);
      console.log("🔍 Gainsight PX: Found Session User:", user);

      const runIdentify = () => {
        if (typeof window.aptrinsic === "function") {
          // 🔥 NUCLEAR IDENTIFY: Using a stable Account ID to guarantee it sticks
          window.aptrinsic("identify",
            {
              id: user.email,
              email: user.email,
              firstName: user.name || "User",
              signUpDate: user.createdAt || Date.now(),
              plan: user.plan || "free"
            },
            {
              // Using a static ID to verify the SDK is capturing identity correctly
              id: "TradingTom_Global_Account",
              name: "TradingTom Community",
              Program: user.plan || "Basic"
            }
          );
          console.log("🚀 Gainsight PX: Identify Triggered for:", user.email);
        }
      };

      // Try once after 2 seconds
      setTimeout(runIdentify, 2000);
      
      // Try again after 5 seconds as a safety backup and log the result
      setTimeout(() => {
        runIdentify();
        if (typeof window.aptrinsic === "function") {
          console.log("✅ Gainsight PX: Final Check - Account ID:", window.aptrinsic("getAccountId"));
        }
      }, 5000);
    }
  }, []);

  return <AppRoutes />;
}

export default App;

export default App;