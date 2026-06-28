import { useMutation, useQueryClient } from "@tanstack/react-query";
import { greetingApi } from "../api/greeting.api";
import { settingsQueryKeys } from "../model/settings.query-keys";

export function useUpdateGreeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: greetingApi.update,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.greeting(),
      }),
  });
}
