import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { ADMIN_PATH } from "@/shared/constants/paths";
import { clearAdminSession } from "../model/admin-auth.slice";

export function useAdminLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearAdminSession());
    navigate(ADMIN_PATH.LOGIN, { replace: true });
  };

  return { logout, isPending: false };
}
