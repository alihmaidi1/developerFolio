import { useMutation, useQueryClient } from "@tanstack/react-query";
import { softwareSkillsApi } from "../api/software-skills.api";
import { skillsQueryKeys } from "../model/skills.query-keys";

export function useDeleteSoftwareSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softwareSkillsApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: skillsQueryKeys.softwareSkills(),
      }),
  });
}
