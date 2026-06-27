import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Hero3DFallback } from "./Hero3DFallback";
import { useWebGLCapability } from "./useCapability";
import styles from "./Hero3D.module.css";

const HeroIdCardCanvas = lazy(() => import("./HeroIdCardCanvas"));

interface Hero3DProps {
  username: string;
  role: string;
  available: boolean;
}

/**
 * The hero 3D element — a holographic developer ID card. Decides between
 * WebGL (R3F) and CSS fallback, reserves layout space (zero CLS), and pauses
 * work when offscreen or tab hidden.
 */
export function Hero3D({ username, role, available }: Hero3DProps) {
  const capability = useWebGLCapability();
  const shellRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

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

      {capability === "ready" ? (
        <div className={styles.canvasHost}>
          <Suspense
            fallback={
              <Hero3DFallback
                username={username}
                role={role}
                available={available}
              />
            }
          >
            <HeroIdCardCanvas
              username={username}
              role={role}
              available={available}
              active={active}
            />
          </Suspense>
        </div>
      ) : (
        <Hero3DFallback username={username} role={role} available={available} />
      )}
    </div>
  );
}
