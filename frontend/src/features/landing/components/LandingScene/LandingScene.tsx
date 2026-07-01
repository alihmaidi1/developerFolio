import { Component, lazy, Suspense, type ReactNode } from "react";
import styles from "./LandingScene.module.css";
import { FloatingPanels } from "./FloatingPanels";
import { SceneFallback } from "./SceneFallback";
import { useReducedMotion } from "./useReducedMotion";
import { useWebGLSupport } from "./useWebGLSupport";

const LandingCanvas = lazy(() =>
  import("./LandingCanvas").then((m) => ({ default: m.LandingCanvas })),
);

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: Error) {
    if (import.meta.env.DEV) {
      console.error("[LandingScene] canvas error", err);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function LandingScene() {
  const webglSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.canvasHost} aria-hidden="true">
      {webglSupported === false ? (
        <SceneFallback variant="unsupported" />
      ) : webglSupported === null ? (
        <SceneFallback variant="loading" />
      ) : (
        <CanvasErrorBoundary fallback={<SceneFallback variant="error" />}>
          <Suspense fallback={<SceneFallback variant="loading" />}>
            <LandingCanvas reducedMotion={reducedMotion} />
          </Suspense>
        </CanvasErrorBoundary>
      )}

      <FloatingPanels />
    </div>
  );
}
