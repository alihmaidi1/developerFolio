import { useQuery } from "@tanstack/react-query";
import { socialLinksApi } from "../api/social-links.api";
import { settingsQueryKeys } from "../model/settings.query-keys";

export function useSocialLinks() {
  return useQuery({
    queryKey: settingsQueryKeys.socialLinksList(),
    queryFn: socialLinksApi.list,
  });
}
