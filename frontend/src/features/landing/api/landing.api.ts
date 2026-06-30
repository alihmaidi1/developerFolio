import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  PortfolioSettingsResponse,
  PublishedProject,
  PublishedWorkExperience,
} from "./landing.types";
import { LANDING_API_ROUTES } from "@/shared/constants/api-routes";

export const landingApi = {
  getSettings: async (): Promise<PortfolioSettingsResponse> => {
    const result = await publicApi.get<TResult<PortfolioSettingsResponse>>(
      LANDING_API_ROUTES.portfolioSettings,
    );
    return unwrapOperationResult(result);
  },

  getProjects: async (): Promise<PublishedProject[]> => {
    const result = await publicApi.get<TResult<PublishedProject[]>>(
      LANDING_API_ROUTES.publishedProjects,
    );
    return unwrapOperationResult(result);
  },

  getWorkExperience: async (): Promise<PublishedWorkExperience[]> => {
    const result = await publicApi.get<TResult<PublishedWorkExperience[]>>(
      LANDING_API_ROUTES.publishedWorkExperience,
    );
    return unwrapOperationResult(result);
  },
};
