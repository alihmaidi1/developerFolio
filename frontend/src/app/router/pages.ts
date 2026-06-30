import { lazy, type ComponentType } from "react";

function load<T extends ComponentType>(
  factory: () => Promise<Record<string, T>>,
  name: string,
) {
  return lazy(() => factory().then((module) => ({ default: module[name] })));
}

export const ADMIN_PAGES = {
  LOGIN: load(
    () => import("@/features/auth/pages/AdminLoginPage"),
    "AdminLoginPage",
  ),
  DASHBOARD: load(
    () => import("@/features/admin/pages/dashboard/AdminDashboardPage"),
    "AdminDashboardPage",
  ),

  PROJECTS: load(
    () => import("@/features/projects/pages/AdminProjectsPage"),
    "AdminProjectsPage",
  ),
  PROJECTS_NEW: load(
    () => import("@/features/projects/pages/AddProjectPage"),
    "AddProjectPage",
  ),
  PROJECTS_EDIT: load(
    () => import("@/features/projects/pages/EditProjectPage"),
    "EditProjectPage",
  ),

  EDUCATION: load(
    () => import("@/features/education/pages/AdminEducationPage"),
    "AdminEducationPage",
  ),
  EDUCATION_NEW: load(
    () => import("@/features/education/pages/AddEducationPage"),
    "AddEducationPage",
  ),
  EDUCATION_EDIT: load(
    () => import("@/features/education/pages/EditEducationPage"),
    "EditEducationPage",
  ),

  WORK_EXPERIENCE: load(
    () => import("@/features/work-experience/pages/AdminWorkExperiencePage"),
    "AdminWorkExperiencePage",
  ),
  WORK_EXPERIENCE_NEW: load(
    () => import("@/features/work-experience/pages/AddWorkExperiencePage"),
    "AddWorkExperiencePage",
  ),
  WORK_EXPERIENCE_EDIT: load(
    () => import("@/features/work-experience/pages/EditWorkExperiencePage"),
    "EditWorkExperiencePage",
  ),

  SKILLS: load(
    () => import("@/features/skills/pages/AdminSkillsPage"),
    "AdminSkillsPage",
  ),
  SETTINGS: load(
    () => import("@/features/settings/pages/AdminSettingsPage"),
    "AdminSettingsPage",
  ),
} as const;
