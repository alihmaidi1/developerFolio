import { useQuery } from "@tanstack/react-query";
import { getEducation } from "../api/update-education.api";
import { educationQueryKeys } from "../model/education.query-keys";

export function useEducationDetails(educationId: string) {
  return useQuery({
    queryKey: educationQueryKeys.detail(educationId),
    queryFn: () => getEducation(educationId),
    enabled: Boolean(educationId),
  });
}
