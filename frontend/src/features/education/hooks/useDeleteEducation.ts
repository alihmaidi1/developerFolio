import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationApi } from "../api/education.api";
import { educationQueryKeys } from "../model/education.query-keys";

export function useDeleteEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: educationApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.all }),
  });
}
