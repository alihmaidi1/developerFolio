import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminWorkExperience,
  ReorderWorkExperienceRequest,
} from "../model/work-experience.types";
import { WORK_EXPERIENCE_API_ROUTES } from "./work-experience.routes";

export const workExperienceApi = {
  list: async (): Promise<AdminWorkExperience[]> => {
    const result = await privateApi.get<TResult<AdminWorkExperience[]>>(
      WORK_EXPERIENCE_API_ROUTES.list,
    );

    return unwrapOperationResult(result);
  },

  delete: (workExperienceId: string): Promise<void> =>
    privateApi.delete<void>(
      WORK_EXPERIENCE_API_ROUTES.delete(workExperienceId),
    ),

  reorder: ({
    workExperienceId,
    direction,
  }: ReorderWorkExperienceRequest): Promise<void> =>
    privateApi.patch<void>(
      WORK_EXPERIENCE_API_ROUTES.reorder(workExperienceId),
      { direction },
    ),
};
