import { useQuery } from "@tanstack/react-query";
import { educationApi } from "../api/education.api";
import { educationQueryKeys } from "../model/education.query-keys";

export function useAdminEducation() {
  return useQuery({
    queryKey: educationQueryKeys.list(),
    queryFn: educationApi.list,
  });
}
