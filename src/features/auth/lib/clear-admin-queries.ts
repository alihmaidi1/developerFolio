import { queryClient } from "@/shared/lib/query-client";

export function clearAdminQueries(): void {
  queryClient.removeQueries({
    predicate: (query) => query.queryKey[0] === "admin",
  });
}
