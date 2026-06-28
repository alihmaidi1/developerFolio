import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AppErrorBoundary } from "@/app/errors/AppErrorBoundary";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouter } from "@/app/router/AppRouter";
import "@/assets/styles/index.scss";

gsap.registerPlugin(ScrollTrigger);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </AppErrorBoundary>
  </StrictMode>,
);
