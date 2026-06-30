import { STORAGE_KEYS } from "@/shared/constants/storage-keys";
import { createAxiosClient, makeApi } from "./api-client";

let unauthorizedHandler: () => void = () => undefined;

export function setUnauthorizedHandler(handler: () => void): void {
  unauthorizedHandler = handler;
}

export const privateAxios = createAxiosClient({
  onUnauthorized: () => unauthorizedHandler(),
  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN),
});
export const privateApi = makeApi(privateAxios);
