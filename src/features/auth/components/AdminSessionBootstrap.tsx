import { useEffect, type ReactNode } from "react";
import { useAppDispatch } from "@/app/store";
import { setUnauthorizedHandler } from "@/shared/lib/private-client";
import { getAdminSession } from "../api/auth.api";
import { clearAdminQueries } from "../lib/clear-admin-queries";
import { clearAdminSession, setAdminSession } from "../model/admin-auth.slice";

interface AdminSessionBootstrapProps {
  children: ReactNode;
}

export function AdminSessionBootstrap({
  children,
}: AdminSessionBootstrapProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isActive = true;
    const clearSession = () => {
      dispatch(clearAdminSession());
      clearAdminQueries();
    };
    const unregisterUnauthorizedHandler = setUnauthorizedHandler(clearSession);

    getAdminSession()
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
