import { createSignal } from "./signal";

export const pathSignal = createSignal(
  typeof window !== "undefined" ? window.location.pathname : "/",
);
export const projectIdSignal = createSignal<string | null>(null);
export const recentProjectIdSignal = createSignal<string | null>(null);
export const projectVisibleSignal = createSignal(false);
export const isTransitioningSignal = createSignal(false);
export const ROUTE_TRANSITION_DURATION = 500;

export const isProjectRoute = (path: string) =>
  path.match(/^\/project\/([^/]+)$/);

export const syncRouteState = (pathname: string) => {
  pathSignal.value = pathname;
  const match = isProjectRoute(pathname);
  const projectId = match ? match[1] : null;
  projectIdSignal.value = projectId;
  if (projectId) recentProjectIdSignal.value = projectId;
  projectVisibleSignal.value =
    projectId !== null && !isTransitioningSignal.value;
};

export const setTransitioning = (isTransitioning: boolean) => {
  isTransitioningSignal.value = isTransitioning;
  projectVisibleSignal.value =
    projectIdSignal.value !== null && !isTransitioning;
};
