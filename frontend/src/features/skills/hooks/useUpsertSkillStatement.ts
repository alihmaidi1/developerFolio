import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resolveApiError } from "@/shared/lib/api-error";
import { skillStatementsApi } from "../api/skill-statements.api";
import type { AdminSkillStatement } from "../model/skill-statement.types";
import { skillsQueryKeys } from "../model/skills.query-keys";

interface UpsertVariables {
  text: string;
  isPublished: boolean;
}

interface UseUpsertOptions {
  onSuccess?: () => void;
}

export function useUpsertSkillStatement(
  existing: AdminSkillStatement | null,
  options?: UseUpsertOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: UpsertVariables) => {
      if (existing) {
        await skillStatementsApi.update({ id: existing.id, request: values });
        return existing.id;
      }
      return skillStatementsApi.create(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: skillsQueryKeys.statements(),
      });
      options?.onSuccess?.();
    },
  });
}

export function useUpsertSkillStatementError(
  mutation: ReturnType<typeof useUpsertSkillStatement>,
): string | null {
  return mutation.isError ? resolveApiError(mutation.error) : null;
}
