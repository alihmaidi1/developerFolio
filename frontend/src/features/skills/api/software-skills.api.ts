import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminSoftwareSkill,
  ReorderSoftwareSkillRequest,
  UpsertSoftwareSkillRequest,
} from "../model/software-skill.types";
import { SOFTWARE_SKILL_ROUTES } from "./skills.routes";

export const softwareSkillsApi = {
  list: async (): Promise<AdminSoftwareSkill[]> => {
    const result = await privateApi.get<TResult<AdminSoftwareSkill[]>>(
      SOFTWARE_SKILL_ROUTES.list,
    );
    return unwrapOperationResult(result);
  },

  get: async (id: string): Promise<AdminSoftwareSkill> => {
    const result = await privateApi.get<TResult<AdminSoftwareSkill>>(
      SOFTWARE_SKILL_ROUTES.detail(id),
    );
    return unwrapOperationResult(result);
  },

  create: async (request: UpsertSoftwareSkillRequest): Promise<string> => {
    const result = await privateApi.post<TResult<string>>(
      SOFTWARE_SKILL_ROUTES.create,
      request,
    );
    return unwrapOperationResult(result);
  },

  update: ({
    id,
    request,
  }: {
    id: string;
    request: UpsertSoftwareSkillRequest;
  }): Promise<void> =>
    privateApi.put<void>(SOFTWARE_SKILL_ROUTES.update(id), request),

  delete: (id: string): Promise<void> =>
    privateApi.delete<void>(SOFTWARE_SKILL_ROUTES.delete(id)),

  reorder: ({
    softwareSkillId,
    direction,
  }: ReorderSoftwareSkillRequest): Promise<void> =>
    privateApi.patch<void>(SOFTWARE_SKILL_ROUTES.reorder(softwareSkillId), {
      direction,
    }),
};
