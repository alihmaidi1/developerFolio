import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "@/app/providers/AppProviders";
import PortfolioPage from "@/app/PortfolioPage";
import "@/app/styles/index.css";
import "@/app/styles/global.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <PortfolioPage />
    </AppProviders>
  </StrictMode>,
);
