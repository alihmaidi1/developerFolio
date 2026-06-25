import { publicApi } from "@/shared/lib/public-api";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";

export interface PublishedSkillStatement {
  id: string;
  text: string;
}

export interface PublishedSoftwareSkill {
  id: string;
  name: string;
  iconClassName: string;
}

export interface PublishedSkills {
  statements: PublishedSkillStatement[];
  softwareSkills: PublishedSoftwareSkill[];
}

const PUBLISHED_SKILLS_ROUTE = "/api/skills";

export async function getPublishedSkills(): Promise<PublishedSkills> {
  const result = await publicApi.get<TResult<PublishedSkills>>(
    PUBLISHED_SKILLS_ROUTE,
  );

  return unwrapOperationResult(result);
}
