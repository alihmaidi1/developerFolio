import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminSession } from "./auth.types";

interface AdminAuthState {
  user: AdminSession | null;
  status: "checking" | "authenticated" | "anonymous";
}

const initialState: AdminAuthState = {
  user: null,
  status: "checking",
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminSession(state, action: PayloadAction<AdminSession>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    clearAdminSession(state) {
      state.user = null;
      state.status = "anonymous";
    },
  },
});

export const { setAdminSession, clearAdminSession } = adminAuthSlice.actions;
export const adminAuthReducer = adminAuthSlice.reducer;
