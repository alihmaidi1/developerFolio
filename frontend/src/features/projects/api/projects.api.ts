import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminProject,
  ReorderProjectRequest,
} from "../model/project.types";
import { PROJECTS_API_ROUTES } from "@/shared/constants/api-routes";

export const projectsApi = {
  list: async (): Promise<AdminProject[]> => {
    const result = await privateApi.get<TResult<AdminProject[]>>(
      PROJECTS_API_ROUTES.list,
    );

    return unwrapOperationResult(result);
  },

  delete: (projectId: string): Promise<void> =>
    privateApi.delete<void>(PROJECTS_API_ROUTES.delete(projectId)),

  reorder: ({ projectId, direction }: ReorderProjectRequest): Promise<void> =>
    privateApi.patch<void>(PROJECTS_API_ROUTES.reorder(projectId), {
      direction,
    }),
};
