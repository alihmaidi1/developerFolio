import { createContext, useContext } from "react";

export interface SmoothScrollAPI {
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollAPI | null>(null);

export function useSmoothScroll(): SmoothScrollAPI {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    return {
      scrollTo: (target) => {
        if (typeof target === "string") {
          const el = document.getElementById(target.replace(/^#/, ""));
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
          return;
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    };
  }
  return ctx;
}
