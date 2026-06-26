import { privateApi, privateAxios } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import type { GreetingSettings } from "../model/settings.types";
import { SETTINGS_ROUTES } from "./settings.routes";

interface UploadVideoResponse {
  url: string;
}

export const greetingApi = {
  get: async (): Promise<GreetingSettings> => {
    const result = await privateApi.get<TResult<GreetingSettings>>(
      SETTINGS_ROUTES.greeting,
    );
    return unwrapOperationResult(result);
  },

  update: (payload: GreetingSettings): Promise<void> =>
    privateApi.put<void>(SETTINGS_ROUTES.greeting, payload),

  uploadVideo: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await privateAxios.post<TResult<UploadVideoResponse>>(
      SETTINGS_ROUTES.greetingVideoUpload,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return unwrapOperationResult(response.data).url;
  },
};
