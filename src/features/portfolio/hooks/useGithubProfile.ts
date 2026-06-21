import { useQuery } from "@tanstack/react-query";
import { getGithubData } from "../api/portfolio.api";
import { portfolioQueryKeys } from "../model/portfolio.query-keys";

export function useGithubProfile(enabled: boolean) {
  return useQuery({
    queryKey: portfolioQueryKeys.githubData(),
    queryFn: getGithubData,
    enabled,
  });
}
