export const landingQueryKeys = {
  all: ["landing"] as const,
  page: () => [...landingQueryKeys.all, "page"] as const,
};
