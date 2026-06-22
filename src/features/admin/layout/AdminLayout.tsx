import { Link, NavLink, Outlet } from "react-router-dom";
import { FolderKanban, FileText, LogOut } from "lucide-react";
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
          <strong className={styles.brandName}>Control</strong>
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
            <FolderKanban aria-hidden="true" />
            Overview
          </NavLink>
          <span className={styles.navigationUnavailable} aria-disabled="true">
            <FileText aria-hidden="true" />
            Content tools coming next
          </span>
        </nav>

        <div className={styles.account}>
          <div className={styles.accountIdentity}>
            <span>Signed in as</span>
            <strong>{admin?.email}</strong>
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
