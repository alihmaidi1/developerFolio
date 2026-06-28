import { createAxiosClient, makeApi } from "./api-client";

export const publicApiAxios = createAxiosClient({
  onUnauthorized: () => undefined,
});
export const publicApi = makeApi(publicApiAxios);
