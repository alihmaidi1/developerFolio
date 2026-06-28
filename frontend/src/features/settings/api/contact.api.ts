import { privateApi } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { ContactSettings } from "../model/settings.types";
import { SETTINGS_ROUTES } from "./settings.routes";

export const contactApi = {
  get: async (): Promise<ContactSettings> => {
    const result = await privateApi.get<TResult<ContactSettings>>(
      SETTINGS_ROUTES.contact,
    );
    return unwrapOperationResult(result);
  },

  update: (payload: ContactSettings): Promise<void> =>
    privateApi.put<void>(SETTINGS_ROUTES.contact, payload),
};
