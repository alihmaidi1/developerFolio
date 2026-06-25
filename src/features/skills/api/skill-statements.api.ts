import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminSkillStatement,
  ReorderSkillStatementRequest,
  UpsertSkillStatementRequest,
} from "../model/skill-statement.types";
import { SKILL_STATEMENT_ROUTES } from "./skills.routes";

export const skillStatementsApi = {
  list: async (): Promise<AdminSkillStatement[]> => {
    const result = await privateApi.get<TResult<AdminSkillStatement[]>>(
      SKILL_STATEMENT_ROUTES.list,
    );
    return unwrapOperationResult(result);
  },

  get: async (id: string): Promise<AdminSkillStatement> => {
    const result = await privateApi.get<TResult<AdminSkillStatement>>(
      SKILL_STATEMENT_ROUTES.detail(id),
    );
    return unwrapOperationResult(result);
  },

  create: async (request: UpsertSkillStatementRequest): Promise<string> => {
    const result = await privateApi.post<TResult<string>>(
      SKILL_STATEMENT_ROUTES.create,
      request,
    );
    return unwrapOperationResult(result);
  },

  update: ({
    id,
    request,
  }: {
    id: string;
    request: UpsertSkillStatementRequest;
  }): Promise<void> =>
    privateApi.put<void>(SKILL_STATEMENT_ROUTES.update(id), request),

  delete: (id: string): Promise<void> =>
    privateApi.delete<void>(SKILL_STATEMENT_ROUTES.delete(id)),

  reorder: ({
    skillStatementId,
    direction,
  }: ReorderSkillStatementRequest): Promise<void> =>
    privateApi.patch<void>(SKILL_STATEMENT_ROUTES.reorder(skillStatementId), {
      direction,
    }),
};
