import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactApi } from "../api/contact.api";
import { settingsQueryKeys } from "../model/settings.query-keys";

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactApi.update,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.contact(),
      }),
  });
}
