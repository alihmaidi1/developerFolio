export const skillsQueryKeys = {
  all: ["admin", "skills"] as const,
  statements: () => [...skillsQueryKeys.all, "statements"] as const,
  statementsList: () => [...skillsQueryKeys.statements(), "list"] as const,
  statementDetail: (skillStatementId: string) =>
    [...skillsQueryKeys.statements(), "detail", skillStatementId] as const,
  softwareSkills: () => [...skillsQueryKeys.all, "software"] as const,
  softwareSkillsList: () =>
    [...skillsQueryKeys.softwareSkills(), "list"] as const,
  softwareSkillDetail: (softwareSkillId: string) =>
    [...skillsQueryKeys.softwareSkills(), "detail", softwareSkillId] as const,
};
