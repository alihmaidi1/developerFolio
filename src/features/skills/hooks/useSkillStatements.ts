import { useQuery } from "@tanstack/react-query";
import { skillStatementsApi } from "../api/skill-statements.api";
import { skillsQueryKeys } from "../model/skills.query-keys";

export function useSkillStatements() {
  return useQuery({
    queryKey: skillsQueryKeys.statementsList(),
    queryFn: skillStatementsApi.list,
  });
}
