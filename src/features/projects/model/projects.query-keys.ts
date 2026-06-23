export const projectsQueryKeys = {
  all: ["admin", "projects"] as const,
  list: () => [...projectsQueryKeys.all, "list"] as const,
  details: () => [...projectsQueryKeys.all, "detail"] as const,
  detail: (projectId: string) =>
    [...projectsQueryKeys.details(), projectId] as const,
};
