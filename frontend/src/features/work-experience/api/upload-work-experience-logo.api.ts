import { privateAxios } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";
import { WORK_EXPERIENCE_API_ROUTES } from "./work-experience.routes";

interface UploadImageResponse {
  url: string;
}

export async function uploadWorkExperienceLogo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await privateAxios.post<TResult<UploadImageResponse>>(
    WORK_EXPERIENCE_API_ROUTES.uploadLogo,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return unwrapOperationResult(response.data).url;
}
