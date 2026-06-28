export const EDUCATION_API_ROUTES = {
  list: "/api/admin/education",
  create: "/api/admin/education",
  detail: (educationId: string) => `/api/admin/education/${educationId}`,
  delete: (educationId: string) => `/api/admin/education/${educationId}`,
  update: (educationId: string) => `/api/admin/education/${educationId}`,
  reorder: (educationId: string) => `/api/admin/education/${educationId}/order`,
  uploadLogo: "/api/admin/uploads/education-logo",
} as const;
