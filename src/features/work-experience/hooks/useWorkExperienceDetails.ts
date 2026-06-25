import { useQuery } from "@tanstack/react-query";
import { getWorkExperience } from "../api/update-work-experience.api";
import { workExperienceQueryKeys } from "../model/work-experience.query-keys";

export function useWorkExperienceDetails(workExperienceId: string) {
  return useQuery({
    queryKey: workExperienceQueryKeys.detail(workExperienceId),
    queryFn: () => getWorkExperience(workExperienceId),
    enabled: Boolean(workExperienceId),
  });
}
