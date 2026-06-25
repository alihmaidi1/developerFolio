import { useMutation, useQueryClient } from "@tanstack/react-query";
import { softwareSkillsApi } from "../api/software-skills.api";
import type {
  AdminSoftwareSkill,
  ReorderSoftwareSkillRequest,
} from "../model/software-skill.types";
import { skillsQueryKeys } from "../model/skills.query-keys";

interface ReorderContext {
  previousItems?: AdminSoftwareSkill[];
}

export function useReorderSoftwareSkill() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ReorderSoftwareSkillRequest, ReorderContext>({
    mutationFn: softwareSkillsApi.reorder,
    onMutate: async ({ softwareSkillId, direction }) => {
      const listKey = skillsQueryKeys.softwareSkillsList();
      await queryClient.cancelQueries({ queryKey: listKey });
      const previousItems =
        queryClient.getQueryData<AdminSoftwareSkill[]>(listKey);

      if (previousItems) {
        const currentIndex = previousItems.findIndex(
          (item) => item.id === softwareSkillId,
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
          queryClient.setQueryData<AdminSoftwareSkill[]>(
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
          skillsQueryKeys.softwareSkillsList(),
          context.previousItems,
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: skillsQueryKeys.softwareSkillsList(),
      }),
  });
}
