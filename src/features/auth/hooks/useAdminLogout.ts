import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { authApi } from "../api/auth.api";
import { clearAdminQueries } from "../lib/clear-admin-queries";
import { clearAdminSession } from "../model/admin-auth.slice";

export function useAdminLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      dispatch(clearAdminSession());
      clearAdminQueries();
      navigate("/admin/login", { replace: true });
    },
  });

  return {
    logout: () => mutation.mutate(),
    isPending: mutation.isPending,
  };
}
