import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const saved = localStorage.getItem("sessionUser");
    if (!saved || !window.aptrinsic) return;

    const user = JSON.parse(saved);

    //  THIS IS THE FIX
    window.aptrinsic("onReady", function () {
      window.aptrinsic("identify",
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
      console.log("Account:", window.aptrinsic("getAccountId"));
    });

  }, []);

  return <AppRoutes />;
}

export default App;