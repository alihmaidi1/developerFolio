import { useQuery } from "@tanstack/react-query";
import { landingApi } from "../api/landing.api";
import { landingQueryKeys } from "../api/landing.query-keys";

export function usePublishedWorkExperience() {
  return useQuery({
    queryKey: landingQueryKeys.workExperience(),
    queryFn: landingApi.getWorkExperience,
  });
}
