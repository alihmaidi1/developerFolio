import { authTokenStorage } from "./auth-token";
import { createAxiosClient, makeApi } from "./api-client";

let unauthorizedHandler: () => void = () => undefined;

export function setUnauthorizedHandler(handler: () => void): () => void {
  unauthorizedHandler = handler;

  return () => {
    unauthorizedHandler = () => undefined;
  };
}

export const privateAxios = createAxiosClient({
  onUnauthorized: () => unauthorizedHandler(),
  getAccessToken: () => authTokenStorage.get(),
});
export const privateApi = makeApi(privateAxios);
