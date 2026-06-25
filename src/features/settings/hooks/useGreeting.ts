import { useQuery } from "@tanstack/react-query";
import { greetingApi } from "../api/greeting.api";
import { settingsQueryKeys } from "../model/settings.query-keys";

export function useGreeting() {
  return useQuery({
    queryKey: settingsQueryKeys.greeting(),
    queryFn: greetingApi.get,
  });
}
