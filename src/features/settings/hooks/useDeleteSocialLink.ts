import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialLinksApi } from "../api/social-links.api";
import { settingsQueryKeys } from "../model/settings.query-keys";

export function useDeleteSocialLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: socialLinksApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.socialLinks(),
      }),
  });
}
