import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { authTokenStorage } from "@/shared/lib/auth-token";
import { clearAdminQueries } from "../lib/clear-admin-queries";
import { clearAdminSession } from "../model/admin-auth.slice";

export function useAdminLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    authTokenStorage.clear();
    dispatch(clearAdminSession());
    clearAdminQueries();
    navigate("/admin/login", { replace: true });
  };

  return { logout, isPending: false };
}
