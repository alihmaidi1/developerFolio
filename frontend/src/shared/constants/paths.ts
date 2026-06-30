export const ADMIN_PATH = {
  ROOT: "/admin",
  LOGIN: "/admin/login",

  PROJECTS: "/admin/projects",
  PROJECTS_NEW: "/admin/projects/new",
  PROJECTS_EDIT: (projectId: string) => `/admin/projects/${projectId}/edit`,

  EDUCATION: "/admin/education",
  EDUCATION_NEW: "/admin/education/new",
  EDUCATION_EDIT: (educationId: string) =>
    `/admin/education/${educationId}/edit`,

  WORK_EXPERIENCE: "/admin/work-experience",
  WORK_EXPERIENCE_NEW: "/admin/work-experience/new",
  WORK_EXPERIENCE_EDIT: (workExperienceId: string) =>
    `/admin/work-experience/${workExperienceId}/edit`,

  SKILLS: "/admin/skills",
  SETTINGS: "/admin/settings",
} as const;
