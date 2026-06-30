import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminLoginRequest,
  AdminLoginResponse,
} from "../model/auth.types";
import { AUTH_API_ROUTES } from "@/shared/constants/api-routes";

export const authApi = {
  login: async (request: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const result = await privateApi.post<TResult<AdminLoginResponse>>(
      AUTH_API_ROUTES.login,
      request,
    );

    return unwrapOperationResult(result);
  },
};
