import { privateAxios } from "@/shared/lib/private-client";
import { unwrapOperationResult } from "@/shared/lib/operation-result";
import type { TResult } from "@/shared/types/api.types";

interface UploadImageResponse {
  url: string;
}

const UPLOAD_PROJECT_IMAGE_ROUTE = "/api/admin/uploads/project-image";

export async function uploadProjectImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await privateAxios.post<TResult<UploadImageResponse>>(
    UPLOAD_PROJECT_IMAGE_ROUTE,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return unwrapOperationResult(response.data).url;
}
