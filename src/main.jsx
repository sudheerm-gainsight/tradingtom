import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { initDB } from "./services/storage.js";
import { seedCourses, seedModules, seedNews } from "./services/api";


initDB();
seedCourses();
seedModules();
seedNews();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);