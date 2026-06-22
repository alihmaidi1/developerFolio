export const projectsQueryKeys = {
  all: ["admin", "projects"] as const,
  list: () => [...projectsQueryKeys.all, "list"] as const,
};
