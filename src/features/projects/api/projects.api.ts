import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminProject,
  CreateProjectRequest,
} from "../model/project.types";
import { PROJECTS_API_ROUTES } from "./projects.routes";

export const projectsApi = {
  list: async (): Promise<AdminProject[]> => {
    const result = await privateApi.get<TResult<AdminProject[]>>(
      PROJECTS_API_ROUTES.list,
    );

    return unwrapOperationResult(result);
  },

  create: async (request: CreateProjectRequest): Promise<string> => {
    const result = await privateApi.post<TResult<string>>(
      PROJECTS_API_ROUTES.create,
      request,
    );

    return unwrapOperationResult(result);
  },
};
