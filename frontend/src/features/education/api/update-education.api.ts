import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { AdminEducation } from "../model/education.types";
import type { UpdateEducationVariables } from "../model/update-education.types";
import { EDUCATION_API_ROUTES } from "@/shared/constants/api-routes";

export async function getEducation(
  educationId: string,
): Promise<AdminEducation> {
  const result = await privateApi.get<TResult<AdminEducation>>(
    EDUCATION_API_ROUTES.detail(educationId),
  );

  return unwrapOperationResult(result);
}

export function updateEducation({
  educationId,
  request,
}: UpdateEducationVariables): Promise<void> {
  return privateApi.put<void>(
    EDUCATION_API_ROUTES.update(educationId),
    request,
  );
}
