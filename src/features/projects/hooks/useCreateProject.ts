import { useMutation } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";

export function useCreateProject() {
  return useMutation({
    mutationFn: projectsApi.create,
  });
}
