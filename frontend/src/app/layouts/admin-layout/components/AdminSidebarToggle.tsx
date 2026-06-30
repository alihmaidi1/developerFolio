import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import styles from "../AdminLayout.module.css";

interface AdminSidebarToggleProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleDesktop: () => void;
  onToggleMobile: () => void;
}

export function AdminSidebarToggle({
  isCollapsed,
  isMobileOpen,
  onToggleDesktop,
  onToggleMobile,
}: AdminSidebarToggleProps) {
  return (
    <>
      <button
        className={styles.sidebarToggleDesktop}
        type="button"
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
        onClick={onToggleDesktop}
      >
        {isCollapsed ? (
          <PanelLeftOpen aria-hidden="true" />
        ) : (
          <PanelLeftClose aria-hidden="true" />
        )}
      </button>
      <button
        className={styles.sidebarToggleMobile}
        type="button"
        aria-expanded={isMobileOpen}
        aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
        onClick={onToggleMobile}
      >
        <Menu aria-hidden="true" />
      </button>
    </>
  );
}
