import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { ADMIN_PATH } from "@/shared/constants/paths";

interface GuardLocationState {
  from?: string;
}

export function AdminGuard() {
  const user = useAppSelector((state) => state.adminAuth.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={ADMIN_PATH.LOGIN}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}

export function AdminGuestGuard() {
  const user = useAppSelector((state) => state.adminAuth.user);
  const location = useLocation();

  if (user) {
    const destination =
      (location.state as GuardLocationState | null)?.from ?? ADMIN_PATH.ROOT;
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
