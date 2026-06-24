import { Route, Routes } from "react-router-dom";
import { AdminLayout, AdminOverviewPage } from "@/features/admin";
import {
  AdminLoginPage,
  AdminSessionBootstrap,
  RequireAdminSession,
  useAdminLogout,
} from "@/features/auth";
import {
  AddEducationPage,
  AdminEducationPage,
  EditEducationPage,
} from "@/features/education";
import {
  AddProjectPage,
  AdminProjectsPage,
  EditProjectPage,
} from "@/features/projects";

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
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="projects/new" element={<AddProjectPage />} />
            <Route
              path="projects/:projectId/edit"
              element={<EditProjectPage />}
            />
            <Route path="education" element={<AdminEducationPage />} />
            <Route path="education/new" element={<AddEducationPage />} />
            <Route
              path="education/:educationId/edit"
              element={<EditEducationPage />}
            />
          </Route>
        </Route>
      </Routes>
    </AdminSessionBootstrap>
  );
}
