export const SKILL_STATEMENT_ROUTES = {
  list: "/api/admin/skill-statements",
  create: "/api/admin/skill-statements",
  detail: (id: string) => `/api/admin/skill-statements/${id}`,
  update: (id: string) => `/api/admin/skill-statements/${id}`,
  delete: (id: string) => `/api/admin/skill-statements/${id}`,
  reorder: (id: string) => `/api/admin/skill-statements/${id}/order`,
} as const;

export const SOFTWARE_SKILL_ROUTES = {
  list: "/api/admin/software-skills",
  create: "/api/admin/software-skills",
  detail: (id: string) => `/api/admin/software-skills/${id}`,
  update: (id: string) => `/api/admin/software-skills/${id}`,
  delete: (id: string) => `/api/admin/software-skills/${id}`,
  reorder: (id: string) => `/api/admin/software-skills/${id}/order`,
} as const;
