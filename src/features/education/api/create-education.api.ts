import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { CreateEducationRequest } from "../model/create-education.types";
import { EDUCATION_API_ROUTES } from "./education.routes";

export async function createEducation(
  request: CreateEducationRequest,
): Promise<string> {
  const result = await privateApi.post<TResult<string>>(
    EDUCATION_API_ROUTES.create,
    request,
  );

  return unwrapOperationResult(result);
}
