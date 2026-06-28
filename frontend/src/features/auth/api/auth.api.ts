import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminSession,
} from "../model/auth.types";
import { AUTH_API_ROUTES } from "./auth.routes";

export const authApi = {
  login: async (request: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const result = await privateApi.post<TResult<AdminLoginResponse>>(
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
};
