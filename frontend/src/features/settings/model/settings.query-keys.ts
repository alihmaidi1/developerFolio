export const settingsQueryKeys = {
  all: ["admin", "settings"] as const,
  greeting: () => [...settingsQueryKeys.all, "greeting"] as const,
  contact: () => [...settingsQueryKeys.all, "contact"] as const,
  socialLinks: () => [...settingsQueryKeys.all, "social-links"] as const,
  socialLinksList: () => [...settingsQueryKeys.socialLinks(), "list"] as const,
};
