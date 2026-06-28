import { useQuery } from "@tanstack/react-query";
import { workExperienceApi } from "../api/work-experience.api";
import { workExperienceQueryKeys } from "../model/work-experience.query-keys";

export function useAdminWorkExperience() {
  return useQuery({
    queryKey: workExperienceQueryKeys.list(),
    queryFn: workExperienceApi.list,
  });
}
