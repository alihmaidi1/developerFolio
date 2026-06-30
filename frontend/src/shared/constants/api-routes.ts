export const AUTH_API_ROUTES = {
  login: "/api/auth/login",
} as const;

export const LANDING_API_ROUTES = {
  landingPage: "/api/landing-page",
} as const;

export const PROJECTS_API_ROUTES = {
  list: "/api/admin/projects",
  delete: (projectId: string) => `/api/admin/projects/${projectId}`,
  reorder: (projectId: string) => `/api/admin/projects/${projectId}/order`,
} as const;

export const EDUCATION_API_ROUTES = {
  list: "/api/admin/education",
  create: "/api/admin/education",
  detail: (educationId: string) => `/api/admin/education/${educationId}`,
  delete: (educationId: string) => `/api/admin/education/${educationId}`,
  update: (educationId: string) => `/api/admin/education/${educationId}`,
  reorder: (educationId: string) => `/api/admin/education/${educationId}/order`,
  uploadLogo: "/api/admin/uploads/education-logo",
} as const;

export const WORK_EXPERIENCE_API_ROUTES = {
  list: "/api/admin/work-experience",
  create: "/api/admin/work-experience",
  detail: (workExperienceId: string) =>
    `/api/admin/work-experience/${workExperienceId}`,
  delete: (workExperienceId: string) =>
    `/api/admin/work-experience/${workExperienceId}`,
  update: (workExperienceId: string) =>
    `/api/admin/work-experience/${workExperienceId}`,
  reorder: (workExperienceId: string) =>
    `/api/admin/work-experience/${workExperienceId}/order`,
  uploadLogo: "/api/admin/uploads/work-experience-logo",
} as const;

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

export const SETTINGS_ROUTES = {
  greeting: "/api/admin/settings/greeting",
  contact: "/api/admin/settings/contact",
  socialLinks: "/api/admin/settings/social-links",
  socialLinkDetail: (id: string) => `/api/admin/settings/social-links/${id}`,
  socialLinkReorder: (id: string) =>
    `/api/admin/settings/social-links/${id}/order`,
} as const;
