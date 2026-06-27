import { createContext, useContext } from "react";
import type { LandingProject } from "../../api/landing.api";

export interface ProjectOverlayAPI {
  activeProject: LandingProject | null;
  openProject: (project: LandingProject) => void;
  closeProject: () => void;
}

export const ProjectOverlayContext = createContext<ProjectOverlayAPI | null>(
  null,
);

export function useProjectOverlay(): ProjectOverlayAPI {
  const ctx = useContext(ProjectOverlayContext);
  if (!ctx) {
    return {
      activeProject: null,
      openProject: () => undefined,
      closeProject: () => undefined,
    };
  }
  return ctx;
}
