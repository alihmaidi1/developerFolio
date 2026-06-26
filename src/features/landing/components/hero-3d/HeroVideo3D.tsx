import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { HeroVideoFallback } from "./HeroVideoFallback";
import { useWebGLCapability } from "./useCapability";
import styles from "./HeroVideo3D.module.css";

// Lazy: keep three.js out of the initial bundle.
const HeroVideoCanvas = lazy(() => import("./HeroVideoCanvas"));

interface HeroVideo3DProps {
  videoSrc: string | null;
  username: string;
}

/**
 * The 3D hero element. Decides between WebGL (R3F) and CSS-3D fallback,
 * reserves layout space (zero CLS), and pauses when offscreen or tab hidden.
 */
export function HeroVideo3D({ videoSrc, username }: HeroVideo3DProps) {
  const capability = useWebGLCapability();
  const shellRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const placeholderText = username.charAt(0).toUpperCase();

  // Pause work when offscreen or document is hidden.
  useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    let visible = true;
    let inView = true;
    const update = () => setActive(visible && inView);

    const onVisibility = () => {
      visible = !document.hidden;
      update();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        update();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={shellRef} className={styles.shell}>
      <div className={styles.glow} aria-hidden="true" />

      {capability === "ready" && videoSrc ? (
        <div className={styles.canvasHost}>
          <Suspense fallback={<div className={styles.skeleton} />}>
            <HeroVideoCanvas videoSrc={videoSrc} active={active} />
          </Suspense>
        </div>
      ) : (
        <HeroVideoFallback
          videoSrc={videoSrc}
          placeholderText={placeholderText}
        />
      )}
    </div>
  );
}
