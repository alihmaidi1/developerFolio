import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { AdminWorkExperience } from "../model/work-experience.types";
import type { UpdateWorkExperienceVariables } from "../model/update-work-experience.types";
import { WORK_EXPERIENCE_API_ROUTES } from "@/shared/constants/api-routes";

export async function getWorkExperience(
  workExperienceId: string,
): Promise<AdminWorkExperience> {
  const result = await privateApi.get<TResult<AdminWorkExperience>>(
    WORK_EXPERIENCE_API_ROUTES.detail(workExperienceId),
  );

  return unwrapOperationResult(result);
}

export function updateWorkExperience({
  workExperienceId,
  request,
}: UpdateWorkExperienceVariables): Promise<void> {
  return privateApi.put<void>(
    WORK_EXPERIENCE_API_ROUTES.update(workExperienceId),
    request,
  );
}
