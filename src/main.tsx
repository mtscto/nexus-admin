import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRoutes";
import "./styles/globals.css";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { OrganizationProvider } from "./shared/context/OrganizationContext";

document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <OrganizationProvider>
        <AppRouter />
      </OrganizationProvider>
    </AuthProvider>
  </React.StrictMode>
);