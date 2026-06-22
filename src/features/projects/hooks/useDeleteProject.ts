import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";
import { projectsQueryKeys } from "../model/projects.query-keys";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: projectsQueryKeys.all }),
  });
}
