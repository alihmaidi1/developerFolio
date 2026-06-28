import { useEffect, type ReactNode } from "react";
import { useAppDispatch } from "@/app/store";
import { authTokenStorage } from "@/shared/lib/auth-token";
import { setUnauthorizedHandler } from "@/shared/lib/private-client";
import { authApi } from "../api/auth.api";
import { clearAdminQueries } from "../lib/clear-admin-queries";
import { clearAdminSession, setAdminSession } from "../model/admin-auth.slice";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isActive = true;
    const clearSession = () => {
      authTokenStorage.clear();
      dispatch(clearAdminSession());
      clearAdminQueries();
    };
    const unregisterUnauthorizedHandler = setUnauthorizedHandler(clearSession);

    if (!authTokenStorage.get()) {
      clearSession();
      return () => {
        isActive = false;
        unregisterUnauthorizedHandler();
      };
    }

    authApi
      .getSession()
      .then((session) => {
        if (isActive) {
          dispatch(setAdminSession(session));
        }
      })
      .catch(() => {
        if (isActive) {
          clearSession();
        }
      });

    return () => {
      isActive = false;
      unregisterUnauthorizedHandler();
    };
  }, [dispatch]);

  return children;
}
