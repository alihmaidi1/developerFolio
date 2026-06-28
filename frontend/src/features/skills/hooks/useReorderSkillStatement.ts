import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillStatementsApi } from "../api/skill-statements.api";
import type {
  AdminSkillStatement,
  ReorderSkillStatementRequest,
} from "../model/skill-statement.types";
import { skillsQueryKeys } from "../model/skills.query-keys";

interface ReorderContext {
  previousItems?: AdminSkillStatement[];
}

export function useReorderSkillStatement() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ReorderSkillStatementRequest, ReorderContext>(
    {
      mutationFn: skillStatementsApi.reorder,
      onMutate: async ({ skillStatementId, direction }) => {
        const listKey = skillsQueryKeys.statementsList();
        await queryClient.cancelQueries({ queryKey: listKey });
        const previousItems =
          queryClient.getQueryData<AdminSkillStatement[]>(listKey);

        if (previousItems) {
          const currentIndex = previousItems.findIndex(
            (item) => item.id === skillStatementId,
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
            queryClient.setQueryData<AdminSkillStatement[]>(
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
            skillsQueryKeys.statementsList(),
            context.previousItems,
          );
        }
      },
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: skillsQueryKeys.statementsList(),
        }),
    },
  );
}
