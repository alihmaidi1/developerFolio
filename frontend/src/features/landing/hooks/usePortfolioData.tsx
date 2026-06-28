import { createContext, useContext, type ReactNode } from "react";
import { usePortfolioSettings } from "./usePortfolioSettings";
import { usePublishedProjects } from "./usePublishedProjects";
import { usePublishedWorkExperience } from "./usePublishedWorkExperience";
import type {
  PortfolioSettingsResponse,
  PublishedProject,
  PublishedWorkExperience,
} from "../api/landing.types";

interface PortfolioDataContextValue {
  settings: PortfolioSettingsResponse | undefined;
  projects: PublishedProject[] | undefined;
  workExperiences: PublishedWorkExperience[] | undefined;
  isLoading: boolean;
}

const PortfolioDataContext = createContext<PortfolioDataContextValue | null>(
  null,
);

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const settingsQuery = usePortfolioSettings();
  const projectsQuery = usePublishedProjects();
  const workExperienceQuery = usePublishedWorkExperience();

  const value: PortfolioDataContextValue = {
    settings: settingsQuery.data,
    projects: projectsQuery.data,
    workExperiences: workExperienceQuery.data,
    isLoading:
      settingsQuery.isLoading ||
      projectsQuery.isLoading ||
      workExperienceQuery.isLoading,
  };

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolioData() {
  const value = useContext(PortfolioDataContext);
  if (!value) {
    throw new Error(
      "usePortfolioData must be used inside PortfolioDataProvider",
    );
  }
  return value;
}
