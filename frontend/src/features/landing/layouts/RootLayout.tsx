import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/react/Header";
import { Cursor } from "../components/react/Cursor";
import { HomePage } from "../pages/HomePage";
import { ProjectPage } from "../pages/ProjectPage";
import { useAgent } from "../hooks/useAgent";
import { usePreloader } from "../hooks/usePreloader";
import { useScroll } from "../hooks/useScroll";
import { useSignal } from "../hooks/useSignal";
import {
  projectVisibleSignal,
  syncRouteState,
  setTransitioning,
  isTransitioningSignal,
  ROUTE_TRANSITION_DURATION,
} from "../store/routeStore";

export function RootLayout() {
  const location = useLocation();
  const previousProjectRef = useRef<string | null>(null);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectVisible = useSignal(projectVisibleSignal);
  const isTransitioning = useSignal(isTransitioningSignal);
  const { isTouch } = useAgent();

  usePreloader();
  useScroll();

  useEffect(() => {
    const match = location.pathname.match(/^\/project\/([^/]+)$/);
    const nextProject = match ? match[1] : null;
    const previousProject = previousProjectRef.current;
    const entering = previousProject === null && nextProject !== null;
    const leaving = previousProject !== null && nextProject === null;

    syncRouteState(location.pathname);
    previousProjectRef.current = nextProject;

    if (!entering && !leaving) return;

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    setTransitioning(true);
    transitionTimeout.current = setTimeout(() => {
      setTransitioning(false);
      transitionTimeout.current = null;
    }, ROUTE_TRANSITION_DURATION);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  return (
    <>
      <Header />
      <div
        className={projectVisible ? "home-wrapper-projectIsReady" : undefined}
      >
        <HomePage />
      </div>
      <ProjectPage visible={projectVisible} transitioning={isTransitioning} />
      {!isTouch ? <Cursor /> : null}
      <Outlet />
    </>
  );
}
