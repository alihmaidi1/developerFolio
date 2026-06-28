import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { Loading } from "@/shared/ui";

interface GuestLocationState {
  from?: string;
}

export function GuestRoute() {
  const { status, user } = useAppSelector((state) => state.adminAuth);
  const location = useLocation();

  if (status === "checking") {
    return <Loading label="Checking admin session" />;
  }

  if (user) {
    const destination =
      (location.state as GuestLocationState | null)?.from ?? "/admin";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}

export const PublicRoute = GuestRoute;
