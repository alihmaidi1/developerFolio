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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleDesktopSidebar = () =>
    setIsSidebarCollapsed((currentValue) => !currentValue);
  const toggleMobileSidebar = () =>
    setIsMobileSidebarOpen((currentValue) => !currentValue);

  return (
    <div
      className={cn(
        styles.layout,
        isSidebarCollapsed && styles.layoutSidebarCollapsed,
        isMobileSidebarOpen && styles.layoutMobileSidebarOpen,
      )}
    >
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        email={admin?.email}
        isLoggingOut={isLoggingOut}
        onLogout={onLogout}
        onNavigate={() => setIsMobileSidebarOpen(false)}
        onToggleDesktop={toggleDesktopSidebar}
        onToggleMobile={toggleMobileSidebar}
      />

      <main className={styles.workspace}>
        <Outlet />
      </main>
    </div>
  );
}
