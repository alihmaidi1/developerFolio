import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { CreateProjectRequest } from "../model/create-project.types";

const CREATE_PROJECT_ROUTE = "/api/admin/projects";

export async function createProject(
  request: CreateProjectRequest,
): Promise<string> {
  const result = await privateApi.post<TResult<string>>(
    CREATE_PROJECT_ROUTE,
    request,
  );

  return unwrapOperationResult(result);
}
