export const PROJECTS_API_ROUTES = {
  list: "/api/admin/projects",
  delete: (projectId: string) => `/api/admin/projects/${projectId}`,
  reorder: (projectId: string) => `/api/admin/projects/${projectId}/order`,
} as const;
