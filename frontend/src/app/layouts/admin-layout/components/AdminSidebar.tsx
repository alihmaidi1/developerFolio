import styles from "../AdminLayout.module.css";
import { AdminAccountPanel } from "./AdminAccountPanel";
import { AdminBrand } from "./AdminBrand";
import { AdminNavigation } from "./AdminNavigation";
import { AdminSidebarToggle } from "./AdminSidebarToggle";

interface AdminSidebarProps {
  email: string | undefined;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isLoggingOut: boolean;
  onNavigate: () => void;
  onLogout: () => void;
  onToggleDesktop: () => void;
  onToggleMobile: () => void;
}

export function AdminSidebar({
  email,
  isCollapsed,
  isMobileOpen,
  isLoggingOut,
  onNavigate,
  onLogout,
  onToggleDesktop,
  onToggleMobile,
}: AdminSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <AdminBrand isCollapsed={isCollapsed} />
        <AdminSidebarToggle
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          onToggleDesktop={onToggleDesktop}
          onToggleMobile={onToggleMobile}
        />
      </div>
      <AdminNavigation isCollapsed={isCollapsed} onNavigate={onNavigate} />
      <AdminAccountPanel
        email={email}
        isCollapsed={isCollapsed}
        isLoggingOut={isLoggingOut}
        onLogout={onLogout}
      />
    </aside>
  );
}
