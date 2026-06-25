import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type {
  AdminSocialLink,
  ReorderSocialLinkRequest,
  UpsertSocialLinkRequest,
} from "../model/settings.types";
import { SETTINGS_ROUTES } from "./settings.routes";

export const socialLinksApi = {
  list: async (): Promise<AdminSocialLink[]> => {
    const result = await privateApi.get<TResult<AdminSocialLink[]>>(
      SETTINGS_ROUTES.socialLinks,
    );
    return unwrapOperationResult(result);
  },

  create: async (request: UpsertSocialLinkRequest): Promise<string> => {
    const result = await privateApi.post<TResult<string>>(
      SETTINGS_ROUTES.socialLinks,
      request,
    );
    return unwrapOperationResult(result);
  },

  update: ({
    id,
    request,
  }: {
    id: string;
    request: UpsertSocialLinkRequest;
  }): Promise<void> =>
    privateApi.put<void>(SETTINGS_ROUTES.socialLinkDetail(id), request),

  delete: (id: string): Promise<void> =>
    privateApi.delete<void>(SETTINGS_ROUTES.socialLinkDetail(id)),

  reorder: ({
    socialLinkId,
    direction,
  }: ReorderSocialLinkRequest): Promise<void> =>
    privateApi.patch<void>(SETTINGS_ROUTES.socialLinkReorder(socialLinkId), {
      direction,
    }),
};
