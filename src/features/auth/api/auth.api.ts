import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { AdminLoginRequest, AdminSession } from "../model/auth.types";
import { AUTH_API_ROUTES } from "./auth.routes";

export const authApi = {
  login: async (request: AdminLoginRequest): Promise<AdminSession> => {
    const result = await privateApi.post<TResult<AdminSession>>(
      AUTH_API_ROUTES.login,
      request,
    );

    return unwrapOperationResult(result);
  },

  getSession: async (): Promise<AdminSession> => {
    const result = await privateApi.get<TResult<AdminSession>>(
      AUTH_API_ROUTES.session,
    );

    return unwrapOperationResult(result);
  },

  logout: (): Promise<void> => privateApi.post<void>(AUTH_API_ROUTES.logout),
};
