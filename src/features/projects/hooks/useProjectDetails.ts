import { useQuery } from "@tanstack/react-query";
import { projectsQueryKeys } from "../model/projects.query-keys";
import { getProject } from "../api/update-project.api";

export function useProjectDetails(projectId: string) {
  return useQuery({
    queryKey: projectsQueryKeys.detail(projectId),
    queryFn: () => getProject(projectId),
    enabled: Boolean(projectId),
  });
}
