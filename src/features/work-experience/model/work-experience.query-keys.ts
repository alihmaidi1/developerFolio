export const workExperienceQueryKeys = {
  all: ["admin", "work-experience"] as const,
  list: () => [...workExperienceQueryKeys.all, "list"] as const,
  details: () => [...workExperienceQueryKeys.all, "detail"] as const,
  detail: (workExperienceId: string) =>
    [...workExperienceQueryKeys.details(), workExperienceId] as const,
};
