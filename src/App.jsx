import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const saved = localStorage.getItem("sessionUser");
    if (!saved || !window.aptrinsic) return;

    const user = JSON.parse(saved);

    window.aptrinsic("identify",
      {
        id: user.email,
        email: user.email,
        firstName: user.name
      },
      {
        id: user.email,
        name: "User Account"
      }
    );
  }, []);

  return <AppRoutes />;
}

export default App;