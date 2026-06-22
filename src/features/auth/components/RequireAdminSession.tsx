import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/store";

export function RequireAdminSession() {
  const { user, status } = useAppSelector((state) => state.adminAuth);
  const location = useLocation();

  if (status === "checking") {
    return null;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/admin/login"
      replace
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}
