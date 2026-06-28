import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "../api/education.api";
import type {
  AdminEducation,
  ReorderEducationRequest,
} from "../model/education.types";
import { educationQueryKeys } from "../model/education.query-keys";

interface ReorderEducationContext {
  previousEntries?: AdminEducation[];
}

export function useReorderEducation() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    ReorderEducationRequest,
    ReorderEducationContext
  >({
    mutationFn: educationApi.reorder,
    onMutate: async ({ educationId, direction }) => {
      await queryClient.cancelQueries({ queryKey: educationQueryKeys.list() });

      const previousEntries = queryClient.getQueryData<AdminEducation[]>(
        educationQueryKeys.list(),
      );

      if (previousEntries) {
        const currentIndex = previousEntries.findIndex(
          (entry) => entry.id === educationId,
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

          queryClient.setQueryData<AdminEducation[]>(
            educationQueryKeys.list(),
            reordered.map((entry, index) => ({ ...entry, sortOrder: index })),
          );
        }
      }

      return { previousEntries };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousEntries) {
        queryClient.setQueryData(
          educationQueryKeys.list(),
          context.previousEntries,
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.list() }),
  });
}
