import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workExperienceApi } from "../api/work-experience.api";
import { workExperienceQueryKeys } from "../model/work-experience.query-keys";

export function useDeleteWorkExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workExperienceApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: workExperienceQueryKeys.all }),
  });
}
