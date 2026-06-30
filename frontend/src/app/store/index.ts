import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setUnauthorizedHandler } from "@/shared/lib/private-client";
import { adminAuthReducer, clearAdminSession } from "@/features/auth/store";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

setUnauthorizedHandler(() => store.dispatch(clearAdminSession()));

// Re-export auth actions so other modules (e.g. feature hooks) can
// dispatch directly against the store without re-importing the feature.
export { setAdminSession, clearAdminSession } from "@/features/auth/store";
