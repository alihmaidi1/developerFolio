import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { LandingPageResponse } from "./landing.types";
import { LANDING_API_ROUTES } from "@/shared/constants/api-routes";

export const landingApi = {
  getLandingPage: async (): Promise<LandingPageResponse> => {
    const result = await publicApi.get<TResult<LandingPageResponse>>(
      LANDING_API_ROUTES.landingPage,
    );
    return unwrapOperationResult(result);
  },
};
