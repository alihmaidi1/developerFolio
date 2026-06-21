import { useQuery } from "@tanstack/react-query";
import { getMediumBlogs } from "../api/portfolio.api";
import { portfolioQueryKeys } from "../model/portfolio.query-keys";

export function useMediumBlogs(enabled: boolean) {
  return useQuery({
    queryKey: portfolioQueryKeys.mediumBlogs(),
    queryFn: getMediumBlogs,
    enabled,
  });
}
