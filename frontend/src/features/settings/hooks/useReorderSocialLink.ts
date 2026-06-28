import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialLinksApi } from "../api/social-links.api";
import type {
  AdminSocialLink,
  ReorderSocialLinkRequest,
} from "../model/settings.types";
import { settingsQueryKeys } from "../model/settings.query-keys";

interface ReorderContext {
  previousItems?: AdminSocialLink[];
}

export function useReorderSocialLink() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ReorderSocialLinkRequest, ReorderContext>({
    mutationFn: socialLinksApi.reorder,
    onMutate: async ({ socialLinkId, direction }) => {
      const listKey = settingsQueryKeys.socialLinksList();
      await queryClient.cancelQueries({ queryKey: listKey });
      const previousItems =
        queryClient.getQueryData<AdminSocialLink[]>(listKey);

      if (previousItems) {
        const currentIndex = previousItems.findIndex(
          (item) => item.id === socialLinkId,
        );
        const targetIndex =
          direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (
          currentIndex >= 0 &&
          targetIndex >= 0 &&
          targetIndex < previousItems.length
        ) {
          const reordered = [...previousItems];
          [reordered[currentIndex], reordered[targetIndex]] = [
            reordered[targetIndex],
            reordered[currentIndex],
          ];
          queryClient.setQueryData<AdminSocialLink[]>(
            listKey,
            reordered.map((item, index) => ({ ...item, sortOrder: index })),
          );
        }
      }

      return { previousItems };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(
          settingsQueryKeys.socialLinksList(),
          context.previousItems,
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.socialLinksList(),
      }),
  });
}
