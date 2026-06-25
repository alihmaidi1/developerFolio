import { useQuery } from "@tanstack/react-query";
import { getPublicPortfolioSettings } from "../api/public-settings.api";

export function usePortfolioSettings() {
  return useQuery({
    queryKey: ["portfolio", "settings"],
    queryFn: getPublicPortfolioSettings,
    staleTime: 60_000,
  });
}
