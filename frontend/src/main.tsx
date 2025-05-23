import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      closeButton={true}
      theme="dark"
      richColors={true}
      position="top-right"
    />
    <App />
  </StrictMode>
);
