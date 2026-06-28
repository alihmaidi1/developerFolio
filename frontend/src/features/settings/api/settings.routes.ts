export const SETTINGS_ROUTES = {
  greeting: "/api/admin/settings/greeting",
  contact: "/api/admin/settings/contact",
  socialLinks: "/api/admin/settings/social-links",
  socialLinkDetail: (id: string) => `/api/admin/settings/social-links/${id}`,
  socialLinkReorder: (id: string) =>
    `/api/admin/settings/social-links/${id}/order`,
} as const;
