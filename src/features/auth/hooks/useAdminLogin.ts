import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";
import { resolveApiError } from "@/shared/lib/api-error";
import { authApi } from "../api/auth.api";
import { setAdminSession } from "../model/admin-auth.slice";
import { adminLoginSchema, type AdminLoginValues } from "../model/auth.schema";

interface LoginLocationState {
  from?: string;
}

export function useAdminLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (session) => {
      dispatch(setAdminSession(session));
      const destination =
        (location.state as LoginLocationState | null)?.from ?? "/admin";
      navigate(destination, { replace: true });
    },
  });

  return {
    form,
    submit: form.handleSubmit((values) => mutation.mutate(values)),
    isPending: mutation.isPending,
    error: mutation.error ? resolveApiError(mutation.error) : null,
    clearError: mutation.reset,
  };
}
