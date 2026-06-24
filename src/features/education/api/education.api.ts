import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminEducation,
  ReorderEducationRequest,
} from "../model/education.types";
import { EDUCATION_API_ROUTES } from "./education.routes";

export const educationApi = {
  list: async (): Promise<AdminEducation[]> => {
    const result = await privateApi.get<TResult<AdminEducation[]>>(
      EDUCATION_API_ROUTES.list,
    );

    return unwrapOperationResult(result);
  },

  delete: (educationId: string): Promise<void> =>
    privateApi.delete<void>(EDUCATION_API_ROUTES.delete(educationId)),

  reorder: ({
    educationId,
    direction,
  }: ReorderEducationRequest): Promise<void> =>
    privateApi.patch<void>(EDUCATION_API_ROUTES.reorder(educationId), {
      direction,
    }),
};
