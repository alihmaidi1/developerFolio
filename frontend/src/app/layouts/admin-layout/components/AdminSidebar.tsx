import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import styles from "../AdminLayout.module.css";
import { adminNavigationItems } from "../config/adminNavigation";

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
    <aside className={styles.sidebar} aria-label="Admin sidebar">
      <div className={styles.sidebarTop}>
        <Link
          to="/admin"
          className={styles.brand}
          onClick={onNavigate}
          title={isCollapsed ? "Control" : undefined}
        >
          <span className={styles.brandMark}>AH</span>
          <span className={styles.brandText}>
            <strong>Control</strong>
            <small>Admin workspace</small>
          </span>
        </Link>

        <button
          className={styles.desktopToggle}
          type="button"
          aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
          aria-expanded={!isCollapsed}
          onClick={onToggleDesktop}
        >
          {isCollapsed ? (
            <PanelLeftOpen aria-hidden="true" />
          ) : (
            <PanelLeftClose aria-hidden="true" />
          )}
        </button>

        <button
          className={styles.mobileToggle}
          type="button"
          aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileOpen}
          onClick={onToggleMobile}
        >
          {isMobileOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>
      </div>

      <div className={styles.sidebarBody}>
        <nav className={styles.navigation} aria-label="Admin navigation">
          <p className={styles.navigationLabel}>Workspace</p>
          {adminNavigationItems.map((item) => {
            const Icon = item.icon;

            if (!item.to) {
              return (
                <span
                  className={styles.navigationUnavailable}
                  aria-disabled="true"
                  key={item.label}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon aria-hidden="true" />
                  <span className={styles.navigationText}>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                  {item.meta ? (
                    <span className={styles.navigationMeta}>{item.meta}</span>
                  ) : null}
                </span>
              );
            }

            return (
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    styles.navigationLink,
                    isActive && styles.navigationLinkActive,
                  )
                }
                key={item.label}
                onClick={onNavigate}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon aria-hidden="true" />
                <span className={styles.navigationText}>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </NavLink>
            );
          })}
        </nav>

        <section className={styles.account} aria-label="Admin account">
          <div className={styles.accountIdentity}>
            <span className={styles.accountAvatar} aria-hidden="true">
              A
            </span>
            <span className={styles.accountText}>
              <small>Signed in as</small>
              <strong>{email}</strong>
            </span>
          </div>

          <button
            className={styles.logoutButton}
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            title={isCollapsed ? "Sign out" : undefined}
          >
            <LogOut aria-hidden="true" />
            <span>{isLoggingOut ? "Signing out" : "Sign out"}</span>
          </button>
        </section>
      </div>
    </aside>
  );
}
