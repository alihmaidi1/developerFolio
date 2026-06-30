import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "@/shared/constants/storage-keys";
import { clearAdminQueries } from "../session/clear-admin-queries";
import type { AdminSession } from "./auth.types";

interface AdminAuthState {
  user: AdminSession | null;
}

export interface AdminSessionPayload {
  user: AdminSession;
  accessToken: string;
}

function loadFromStorage(): AdminAuthState {
  const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  const rawUser = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (!token || !rawUser) return { user: null };

  try {
    return { user: JSON.parse(rawUser) as AdminSession };
  } catch {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    return { user: null };
  }
}

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: loadFromStorage(),
  reducers: {
    setAdminSession(state, action: PayloadAction<AdminSessionPayload>) {
      const { user, accessToken } = action.payload;
      state.user = user;
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user));
    },
    clearAdminSession(state) {
      state.user = null;
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      clearAdminQueries();
    },
  },
});

export const { setAdminSession, clearAdminSession } = adminAuthSlice.actions;
export const adminAuthReducer = adminAuthSlice.reducer;
