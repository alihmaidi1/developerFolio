import { createContext, useContext, type ReactNode } from "react";
import { useLandingPage } from "./useLandingPage";
import type {
  PortfolioSettingsResponse,
  PublishedProject,
  PublishedWorkExperience,
} from "../api/landing.types";
import { defaultPortfolioSettings } from "../model/defaultPortfolioSettings";

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
  const landingPageQuery = useLandingPage();

  const value: PortfolioDataContextValue = {
    settings: landingPageQuery.data?.settings ?? defaultPortfolioSettings,
    projects: landingPageQuery.data?.projects,
    workExperiences: landingPageQuery.data?.workExperiences,
    isLoading: landingPageQuery.isLoading,
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
