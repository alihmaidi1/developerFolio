import { useQuery } from "@tanstack/react-query";
import { softwareSkillsApi } from "../api/software-skills.api";
import { skillsQueryKeys } from "../model/skills.query-keys";

export function useSoftwareSkills() {
  return useQuery({
    queryKey: skillsQueryKeys.softwareSkillsList(),
    queryFn: softwareSkillsApi.list,
  });
}
