import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";

export interface PublishedEducation {
  id: string;
  schoolName: string;
  degree: string;
  duration: string;
  description: string | null;
  logoUrl: string | null;
  descriptionBullets: string[];
}

const PUBLISHED_EDUCATION_ROUTE = "/api/education";

export async function getPublishedEducation(): Promise<PublishedEducation[]> {
  const result = await publicApi.get<TResult<PublishedEducation[]>>(
    PUBLISHED_EDUCATION_ROUTE,
  );

  return unwrapOperationResult(result);
}
