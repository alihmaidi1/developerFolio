import { Link, NavLink, Outlet } from "react-router-dom";
import {
  BrainCircuit,
  Briefcase,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useAppSelector } from "@/app/store";
import { cn } from "@/shared/lib/cn";
import styles from "./AdminLayout.module.css";

interface AdminLayoutProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function AdminLayout({ onLogout, isLoggingOut }: AdminLayoutProps) {
  const admin = useAppSelector((state) => state.adminAuth.user);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Link to="/admin" className={styles.brand}>
          <span className={styles.brandMark}>AH</span>
          <span className={styles.brandCopy}>
            <strong className={styles.brandName}>Control</strong>
            <small>Admin workspace</small>
          </span>
        </Link>

        <nav className={styles.navigation} aria-label="Admin navigation">
          <p className={styles.navigationLabel}>Workspace</p>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
          >
            <LayoutDashboard aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Overview</strong>
              <small>Workspace status</small>
            </span>
          </NavLink>
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
          >
            <FolderKanban aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Projects</strong>
              <small>Portfolio content</small>
            </span>
          </NavLink>
          <NavLink
            to="/admin/education"
            className={({ isActive }) =>
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
          >
            <GraduationCap aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Education</strong>
              <small>Schools and degrees</small>
            </span>
          </NavLink>
          <NavLink
            to="/admin/work-experience"
            className={({ isActive }) =>
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
          >
            <Briefcase aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Work experience</strong>
              <small>Roles and companies</small>
            </span>
          </NavLink>
          <NavLink
            to="/admin/skills"
            className={({ isActive }) =>
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
          >
            <BrainCircuit aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Skills</strong>
              <small>Statements and stack icons</small>
            </span>
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
          >
            <Settings aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Settings</strong>
              <small>Greeting, contact, social</small>
            </span>
          </NavLink>
          <span className={styles.navigationUnavailable} aria-disabled="true">
            <FileText aria-hidden="true" />
            <span className={styles.navigationCopy}>
              <strong>Resume</strong>
              <small>Document management</small>
            </span>
            <span className={styles.navigationMeta}>Soon</span>
          </span>
        </nav>

        <div className={styles.account}>
          <div className={styles.accountIdentity}>
            <span className={styles.accountAvatar} aria-hidden="true">
              A
            </span>
            <span className={styles.accountCopy}>
              <small>Signed in as</small>
              <strong>{admin?.email}</strong>
            </span>
          </div>
          <button
            className={styles.logoutButton}
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
          >
            <LogOut aria-hidden="true" />
            {isLoggingOut ? "Signing out" : "Sign out"}
          </button>
        </div>
      </aside>

      <main className={styles.workspace}>
        <Outlet />
      </main>
    </div>
  );
}
