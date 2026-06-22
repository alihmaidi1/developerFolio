export const PROJECTS_API_ROUTES = {
  list: "/api/admin/projects",
  create: "/api/admin/projects",
  delete: (projectId: string) => `/api/admin/projects/${projectId}`,
} as const;
