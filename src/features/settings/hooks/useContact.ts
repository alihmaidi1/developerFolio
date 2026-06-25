import { useQuery } from "@tanstack/react-query";
import { contactApi } from "../api/contact.api";
import { settingsQueryKeys } from "../model/settings.query-keys";

export function useContact() {
  return useQuery({
    queryKey: settingsQueryKeys.contact(),
    queryFn: contactApi.get,
  });
}
