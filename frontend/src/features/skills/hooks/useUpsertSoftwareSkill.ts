import { useMutation, useQueryClient } from "@tanstack/react-query";
import { softwareSkillsApi } from "../api/software-skills.api";
import type { AdminSoftwareSkill } from "../model/software-skill.types";
import { skillsQueryKeys } from "../model/skills.query-keys";

interface UpsertVariables {
  name: string;
  iconClassName: string;
  isPublished: boolean;
}

interface UseUpsertOptions {
  onSuccess?: () => void;
}

export function useUpsertSoftwareSkill(
  existing: AdminSoftwareSkill | null,
  options?: UseUpsertOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: UpsertVariables) => {
      if (existing) {
        await softwareSkillsApi.update({ id: existing.id, request: values });
        return existing.id;
      }
      return softwareSkillsApi.create(values);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: skillsQueryKeys.softwareSkills(),
      });
      options?.onSuccess?.();
    },
  });
}
