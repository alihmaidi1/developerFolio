import { useEffect, useMemo, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import {
  SmoothScrollContext,
  type SmoothScrollAPI,
} from "./smooth-scroll-context";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Single Lenis instance for the whole landing. Disabled on prefers-reduced-motion.
 * The provider exposes a stable scrollTo() that delegates to Lenis when available
 * and falls back to native smooth-scroll before mount or on reduced motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  const api = useMemo<SmoothScrollAPI>(
    () => ({
      scrollTo: (target, offset = 0) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, { offset, duration: 1.2 });
          return;
        }
        if (typeof target === "string") {
          const el = document.getElementById(target.replace(/^#/, ""));
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (typeof target === "number") {
          window.scrollTo({ top: target + offset, behavior: "smooth" });
          return;
        }
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }),
    [],
  );

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
