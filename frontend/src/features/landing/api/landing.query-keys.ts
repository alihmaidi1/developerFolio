export const landingQueryKeys = {
  all: ["landing"] as const,
  settings: () => [...landingQueryKeys.all, "settings"] as const,
  projects: () => [...landingQueryKeys.all, "projects"] as const,
  workExperience: () => [...landingQueryKeys.all, "work-experience"] as const,
};
