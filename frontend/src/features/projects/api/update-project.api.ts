import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { AdminProject } from "../model/project.types";
import type { UpdateProjectVariables } from "../model/update-project.types";

const projectRoute = (projectId: string) => `/api/admin/projects/${projectId}`;

export async function getProject(projectId: string): Promise<AdminProject> {
  const result = await privateApi.get<TResult<AdminProject>>(
    projectRoute(projectId),
  );

  return unwrapOperationResult(result);
}

export function updateProject({
  projectId,
  request,
}: UpdateProjectVariables): Promise<void> {
  return privateApi.put<void>(projectRoute(projectId), request);
}
