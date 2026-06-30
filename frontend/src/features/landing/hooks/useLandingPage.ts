import { useQuery } from "@tanstack/react-query";
import { landingApi } from "../api/landing.api";
import { landingQueryKeys } from "../api/landing.query-keys";

export function useLandingPage() {
  return useQuery({
    queryKey: landingQueryKeys.page(),
    queryFn: landingApi.getLandingPage,
  });
}
