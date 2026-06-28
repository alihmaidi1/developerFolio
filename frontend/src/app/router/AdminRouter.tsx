import { Route, Routes } from "react-router-dom";
import { AdminLayout, AdminOverviewPage } from "@/features/admin";
import {
  AdminLoginPage,
  AuthProvider,
  GuestRoute,
  ProtectedRoute,
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
import { AdminSettingsPage } from "@/features/settings";
import { AdminSkillsPage } from "@/features/skills";
import {
  AddWorkExperiencePage,
  AdminWorkExperiencePage,
  EditWorkExperiencePage,
} from "@/features/work-experience";

export default function AdminRouter() {
  const { logout, isPending } = useAdminLogout();

  return (
    <AuthProvider>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="login" element={<AdminLoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
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
            <Route
              path="work-experience"
              element={<AdminWorkExperiencePage />}
            />
            <Route
              path="work-experience/new"
              element={<AddWorkExperiencePage />}
            />
            <Route
              path="work-experience/:workExperienceId/edit"
              element={<EditWorkExperiencePage />}
            />
            <Route path="skills" element={<AdminSkillsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
