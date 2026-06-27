import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LandingProject } from "../../api/landing.api";
import {
  ProjectOverlayContext,
  type ProjectOverlayAPI,
} from "./project-overlay-context";

interface ProjectOverlayProviderProps {
  /** All projects — used to resolve URL hash → project on mount. */
  projects: LandingProject[];
  children: ReactNode;
}

const HASH_PREFIX = "#project/";

function slugFromProject(project: LandingProject): string {
  return project.id;
}

/**
 * Owns the "currently-open project" state. Locks the document body scroll
 * when a project is open. Syncs the active project to the URL hash so deep
 * links + browser back work naturally.
 */
export function ProjectOverlayProvider({
  projects,
  children,
}: ProjectOverlayProviderProps) {
  const [activeProject, setActiveProject] = useState<LandingProject | null>(
    null,
  );

  const openProject = useCallback((project: LandingProject) => {
    setActiveProject(project);
    const slug = slugFromProject(project);
    const next = `${HASH_PREFIX}${slug}`;
    if (window.location.hash !== next) {
      window.history.pushState(null, "", next);
    }
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      // Clearing the hash via history.back when we put it there ourselves
      // keeps browser navigation symmetric; otherwise drop the hash directly.
      window.history.pushState(null, "", window.location.pathname);
    }
  }, []);

  // Body scroll lock while overlay is open.
  useEffect(() => {
    if (!activeProject) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.projectOverlay = "open";
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.projectOverlay;
    };
  }, [activeProject]);

  // ESC to close.
  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProject, closeProject]);

  // Hash sync: on mount + popstate, resolve hash → project.
  useEffect(() => {
    const resolveFromHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(HASH_PREFIX)) {
        setActiveProject(null);
        return;
      }
      const slug = hash.slice(HASH_PREFIX.length);
      const match = projects.find((p) => slugFromProject(p) === slug) ?? null;
      setActiveProject(match);
    };

    resolveFromHash();
    window.addEventListener("popstate", resolveFromHash);
    window.addEventListener("hashchange", resolveFromHash);
    return () => {
      window.removeEventListener("popstate", resolveFromHash);
      window.removeEventListener("hashchange", resolveFromHash);
    };
  }, [projects]);

  const api = useMemo<ProjectOverlayAPI>(
    () => ({ activeProject, openProject, closeProject }),
    [activeProject, openProject, closeProject],
  );

  return (
    <ProjectOverlayContext.Provider value={api}>
      {children}
    </ProjectOverlayContext.Provider>
  );
}
