import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";
import { projectsQueryKeys } from "../model/projects.query-keys";

export function useAdminProjects() {
  return useQuery({
    queryKey: projectsQueryKeys.list(),
    queryFn: projectsApi.list,
  });
}
