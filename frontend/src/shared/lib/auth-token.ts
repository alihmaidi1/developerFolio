const STORAGE_KEY = "developerfolio.adminAccessToken";

export const authTokenStorage = {
  get(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      localStorage.setItem(STORAGE_KEY, token);
    } catch {
      // ignore quota / privacy errors — caller retains in-memory copy
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
