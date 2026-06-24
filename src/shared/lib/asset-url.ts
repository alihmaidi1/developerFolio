import { BASE_URL } from "./api-client";

export function resolveAssetUrl(
  path: string | null | undefined,
): string | null {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL.replace(/\/$/, "")}${normalized}`;
}
