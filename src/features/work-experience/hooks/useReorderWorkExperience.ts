import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workExperienceApi } from "../api/work-experience.api";
import type {
  AdminWorkExperience,
  ReorderWorkExperienceRequest,
} from "../model/work-experience.types";
import { workExperienceQueryKeys } from "../model/work-experience.query-keys";

interface ReorderWorkExperienceContext {
  previousEntries?: AdminWorkExperience[];
}

export function useReorderWorkExperience() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    ReorderWorkExperienceRequest,
    ReorderWorkExperienceContext
  >({
    mutationFn: workExperienceApi.reorder,
    onMutate: async ({ workExperienceId, direction }) => {
      await queryClient.cancelQueries({
        queryKey: workExperienceQueryKeys.list(),
      });

      const previousEntries = queryClient.getQueryData<AdminWorkExperience[]>(
        workExperienceQueryKeys.list(),
      );

      if (previousEntries) {
        const currentIndex = previousEntries.findIndex(
          (entry) => entry.id === workExperienceId,
        );
        const targetIndex =
          direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (
          currentIndex >= 0 &&
          targetIndex >= 0 &&
          targetIndex < previousEntries.length
        ) {
          const reordered = [...previousEntries];
          [reordered[currentIndex], reordered[targetIndex]] = [
            reordered[targetIndex],
            reordered[currentIndex],
          ];

          queryClient.setQueryData<AdminWorkExperience[]>(
            workExperienceQueryKeys.list(),
            reordered.map((entry, index) => ({ ...entry, sortOrder: index })),
          );
        }
      }

      return { previousEntries };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousEntries) {
        queryClient.setQueryData(
          workExperienceQueryKeys.list(),
          context.previousEntries,
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: workExperienceQueryKeys.list(),
      }),
  });
}
