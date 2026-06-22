import { Route, Routes } from "react-router-dom";
import { AdminLayout, AdminOverviewPage } from "@/features/admin";
import {
  AdminLoginPage,
  AdminSessionBootstrap,
  RequireAdminSession,
  useAdminLogout,
} from "@/features/auth";

export default function AdminRouter() {
  const { logout, isPending } = useAdminLogout();

  return (
    <AdminSessionBootstrap>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<RequireAdminSession />}>
          <Route
            element={<AdminLayout onLogout={logout} isLoggingOut={isPending} />}
          >
            <Route index element={<AdminOverviewPage />} />
          </Route>
        </Route>
      </Routes>
    </AdminSessionBootstrap>
  );
}
