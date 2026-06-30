import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { CreateWorkExperienceRequest } from "../model/create-work-experience.types";
import { WORK_EXPERIENCE_API_ROUTES } from "@/shared/constants/api-routes";

export async function createWorkExperience(
  request: CreateWorkExperienceRequest,
): Promise<string> {
  const result = await privateApi.post<TResult<string>>(
    WORK_EXPERIENCE_API_ROUTES.create,
    request,
  );

  return unwrapOperationResult(result);
}
