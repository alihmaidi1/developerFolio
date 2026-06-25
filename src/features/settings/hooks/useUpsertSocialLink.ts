import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialLinksApi } from "../api/social-links.api";
import type {
  AdminSocialLink,
  UpsertSocialLinkRequest,
} from "../model/settings.types";
import { settingsQueryKeys } from "../model/settings.query-keys";

interface UseUpsertOptions {
  onSuccess?: () => void;
}

export function useUpsertSocialLink(
  existing: AdminSocialLink | null,
  options?: UseUpsertOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: UpsertSocialLinkRequest) => {
      if (existing) {
        await socialLinksApi.update({ id: existing.id, request: values });
        return existing.id;
      }
      return socialLinksApi.create(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.socialLinks(),
      });
      options?.onSuccess?.();
    },
  });
}
