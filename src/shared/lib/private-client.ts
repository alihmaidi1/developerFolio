import { createAxiosClient, makeApi } from "./api-client";

let unauthorizedHandler: () => void = () => undefined;

export function setUnauthorizedHandler(handler: () => void): () => void {
  unauthorizedHandler = handler;

  return () => {
    unauthorizedHandler = () => undefined;
  };
}

export const privateAxios = createAxiosClient(() => unauthorizedHandler());
export const privateApi = makeApi(privateAxios);
