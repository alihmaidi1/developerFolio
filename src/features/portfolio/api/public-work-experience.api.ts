import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";

export interface PublishedWorkExperience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string | null;
  companyLogoUrl: string | null;
  descriptionBullets: string[];
}

const PUBLISHED_WORK_EXPERIENCE_ROUTE = "/api/work-experience";

export async function getPublishedWorkExperience(): Promise<
  PublishedWorkExperience[]
> {
  const result = await publicApi.get<TResult<PublishedWorkExperience[]>>(
    PUBLISHED_WORK_EXPERIENCE_ROUTE,
  );

  return unwrapOperationResult(result);
}
