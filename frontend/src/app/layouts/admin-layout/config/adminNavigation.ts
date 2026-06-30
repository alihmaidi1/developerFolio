import {
  BrainCircuit,
  Briefcase,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavigationItem {
  description: string;
  end?: boolean;
  icon: LucideIcon;
  label: string;
  meta?: string;
  to?: string;
}

export const adminNavigationItems: AdminNavigationItem[] = [
  {
    description: "Workspace status",
    end: true,
    icon: LayoutDashboard,
    label: "Overview",
    to: "/admin",
  },
  {
    description: "Portfolio content",
    icon: FolderKanban,
    label: "Projects",
    to: "/admin/projects",
  },
  {
    description: "Schools and degrees",
    icon: GraduationCap,
    label: "Education",
    to: "/admin/education",
  },
  {
    description: "Roles and companies",
    icon: Briefcase,
    label: "Work experience",
    to: "/admin/work-experience",
  },
  {
    description: "Statements and stack icons",
    icon: BrainCircuit,
    label: "Skills",
    to: "/admin/skills",
  },
  {
    description: "Greeting, contact, social",
    icon: Settings,
    label: "Settings",
    to: "/admin/settings",
  },
  {
    description: "Document management",
    icon: FileText,
    label: "Resume",
    meta: "Soon",
  },
];
