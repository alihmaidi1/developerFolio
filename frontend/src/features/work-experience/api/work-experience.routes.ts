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
