import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/app/layouts/admin-layout/AdminLayout";
import "@/styles/admin-theme.css";
import { useAdminLogout } from "@/features/auth";
import { AdminGuard, AdminGuestGuard } from "./guards";
import { ADMIN_PAGES } from "./pages";

export default function AdminRouter() {
  const { logout, isPending } = useAdminLogout();

  return (
    <Routes>
      <Route element={<AdminGuestGuard />}>
        <Route path="login" element={<ADMIN_PAGES.LOGIN />} />
      </Route>
      <Route element={<AdminGuard />}>
        <Route
          element={<AdminLayout onLogout={logout} isLoggingOut={isPending} />}
        >
          <Route index element={<ADMIN_PAGES.DASHBOARD />} />
          <Route path="projects" element={<ADMIN_PAGES.PROJECTS />} />
          <Route path="projects/new" element={<ADMIN_PAGES.PROJECTS_NEW />} />
          <Route
            path="projects/:projectId/edit"
            element={<ADMIN_PAGES.PROJECTS_EDIT />}
          />
          <Route path="education" element={<ADMIN_PAGES.EDUCATION />} />
          <Route path="education/new" element={<ADMIN_PAGES.EDUCATION_NEW />} />
          <Route
            path="education/:educationId/edit"
            element={<ADMIN_PAGES.EDUCATION_EDIT />}
          />
          <Route
            path="work-experience"
            element={<ADMIN_PAGES.WORK_EXPERIENCE />}
          />
          <Route
            path="work-experience/new"
            element={<ADMIN_PAGES.WORK_EXPERIENCE_NEW />}
          />
          <Route
            path="work-experience/:workExperienceId/edit"
            element={<ADMIN_PAGES.WORK_EXPERIENCE_EDIT />}
          />
          <Route path="skills" element={<ADMIN_PAGES.SKILLS />} />
          <Route path="settings" element={<ADMIN_PAGES.SETTINGS />} />
        </Route>
      </Route>
    </Routes>
  );
}
