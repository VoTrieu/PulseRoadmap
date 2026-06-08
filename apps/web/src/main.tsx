import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { AppToast } from "./components/ui/AppToast";
import { AuthProvider } from "./context/AuthContext";
import "./i18n/i18n";
import { queryClient } from "./queries/queryClient";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <AppToast />
    </QueryClientProvider>
  </StrictMode>,
);
