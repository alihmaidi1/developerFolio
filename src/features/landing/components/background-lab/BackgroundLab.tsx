import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useWebGLCapability } from "../hero-3d/useCapability";
import styles from "./BackgroundLab.module.css";

const BackgroundLabCanvas = lazy(() => import("./BackgroundLabCanvas"));

const MOBILE_BREAKPOINT = 920;

/**
 * Persistent 3D lab atmosphere behind the entire landing page. Pure
 * decoration — fades out gracefully on mobile, touch, save-data, and
 * reduced-motion. Tracks scroll + pointer via refs so the scene can
 * react without forcing React re-renders.
 */
export function BackgroundLab() {
  const capability = useWebGLCapability();
  const [enabled, setEnabled] = useState(true);
  const [active, setActive] = useState(true);
  const scrollProgressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  // Mobile + save-data + touch are excluded so the background never costs
  // anything on hardware where it's likely to hurt.
  useEffect(() => {
    const evaluate = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setEnabled(false);
        return;
      }
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouch) {
        setEnabled(false);
        return;
      }
      const conn = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      if (conn?.saveData) {
        setEnabled(false);
        return;
      }
      setEnabled(true);
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  // Pointer / scroll tracking — written to refs only, no React state churn.
  useEffect(() => {
    if (!enabled || capability !== "ready") return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = max > 0 ? window.scrollY / max : 0;
    };
    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVisibility = () => setActive(!document.hidden);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, capability]);

  if (capability !== "ready" || !enabled) {
    return null;
  }

  return (
    <div className={styles.shell} aria-hidden="true">
      <Suspense fallback={null}>
        <BackgroundLabCanvas
          scrollProgressRef={scrollProgressRef}
          pointerRef={pointerRef}
          active={active}
        />
      </Suspense>
      {/* Top fade so HUD/Navbar stay legible. */}
      <div className={styles.topFade} />
      {/* Bottom fade so footer stays anchored. */}
      <div className={styles.bottomFade} />
    </div>
  );
}
