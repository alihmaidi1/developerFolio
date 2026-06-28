import { useQuery } from "@tanstack/react-query";
import { landingApi } from "../api/landing.api";
import { landingQueryKeys } from "../api/landing.query-keys";

export function usePortfolioSettings() {
  return useQuery({
    queryKey: landingQueryKeys.settings(),
    queryFn: landingApi.getSettings,
  });
}
