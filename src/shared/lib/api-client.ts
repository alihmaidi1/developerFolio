import axios, { type AxiosInstance } from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5062";

export function createAxiosClient(onUnauthorized: () => void): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return client;
}

export function makeApi(client: AxiosInstance) {
  return {
    get: <T>(url: string, params?: object) =>
      client.get<T>(url, { params }).then((response) => response.data),
    post: <T>(url: string, data?: unknown) =>
      client.post<T>(url, data).then((response) => response.data),
    put: <T>(url: string, data?: unknown) =>
      client.put<T>(url, data).then((response) => response.data),
    patch: <T>(url: string, data?: unknown) =>
      client.patch<T>(url, data).then((response) => response.data),
    delete: <T>(url: string) =>
      client.delete<T>(url).then((response) => response.data),
  };
}
