import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillStatementsApi } from "../api/skill-statements.api";
import { skillsQueryKeys } from "../model/skills.query-keys";

export function useDeleteSkillStatement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: skillStatementsApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: skillsQueryKeys.statements() }),
  });
}
