import { privateApi } from "@/shared/lib/private-client";
import type { TResult } from "@/shared/types/api.types";
import type { AdminLoginRequest, AdminSession } from "../model/auth.types";
import { AUTH_API_ROUTES } from "./auth.routes";

export async function loginAdmin(
  request: AdminLoginRequest,
): Promise<AdminSession> {
  const result = await privateApi.post<TResult<AdminSession>>(
    AUTH_API_ROUTES.login,
    request,
  );

  if (!result.isSuccess || !result.value) {
    throw new Error(result.error?.message ?? "Login failed.");
  }

  return result.value;
}

export async function getAdminSession(): Promise<AdminSession> {
  const result = await privateApi.get<TResult<AdminSession>>(
    AUTH_API_ROUTES.session,
  );

  if (!result.isSuccess || !result.value) {
    throw new Error(result.error?.message ?? "The admin session is invalid.");
  }

  return result.value;
}

export function logoutAdmin(): Promise<void> {
  return privateApi.post<void>(AUTH_API_ROUTES.logout);
}
