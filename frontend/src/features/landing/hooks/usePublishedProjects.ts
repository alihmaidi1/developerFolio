import { useQuery } from "@tanstack/react-query";
import { landingApi } from "../api/landing.api";
import { landingQueryKeys } from "../api/landing.query-keys";

export function usePublishedProjects() {
  return useQuery({
    queryKey: landingQueryKeys.projects(),
    queryFn: landingApi.getProjects,
  });
}
