import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { cn } from "@/shared/lib/cn";
import styles from "./AdminLayout.module.css";
import { AdminSidebar } from "./components/AdminSidebar";

interface AdminLayoutProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function AdminLayout({ onLogout, isLoggingOut }: AdminLayoutProps) {
  const admin = useAppSelector((state) => state.adminAuth.user);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const toggleDesktopSidebar = () =>
    setIsSidebarCollapsed((currentValue) => !currentValue);
  const toggleMobileSidebar = () =>
    setIsMobileNavigationOpen((currentValue) => !currentValue);

  return (
    <div
      className={cn(
        styles.layout,
        isSidebarCollapsed && styles.layoutSidebarCollapsed,
        isMobileNavigationOpen && styles.layoutMobileSidebarOpen,
      )}
    >
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileNavigationOpen}
        email={admin?.email}
        isLoggingOut={isLoggingOut}
        onLogout={onLogout}
        onNavigate={() => setIsMobileNavigationOpen(false)}
        onToggleDesktop={toggleDesktopSidebar}
        onToggleMobile={toggleMobileSidebar}
      />

      <main className={styles.workspace}>
        <Outlet />
      </main>
    </div>
  );
}
