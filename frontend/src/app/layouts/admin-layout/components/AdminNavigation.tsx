import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";
import styles from "../AdminLayout.module.css";
import { adminNavigationItems } from "../config/adminNavigation";

interface AdminNavigationProps {
  isCollapsed: boolean;
  onNavigate: () => void;
}

export function AdminNavigation({
  isCollapsed,
  onNavigate,
}: AdminNavigationProps) {
  return (
    <nav className={styles.navigation} aria-label="Admin navigation">
      <p
        className={cn(
          styles.navigationLabel,
          isCollapsed && styles.collapsedOnlyHidden,
        )}
      >
        Workspace
      </p>
      {adminNavigationItems.map((item) => {
        const Icon = item.icon;

        if (!item.to) {
          return (
            <span
              className={styles.navigationUnavailable}
              aria-disabled="true"
              key={item.label}
            >
              <Icon aria-hidden="true" />
              <span
                className={cn(
                  styles.navigationCopy,
                  isCollapsed && styles.collapsedOnlyHidden,
                )}
              >
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
              {item.meta && !isCollapsed ? (
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
              cn(styles.navigationLink, isActive && styles.navigationLinkActive)
            }
            key={item.label}
            onClick={onNavigate}
            title={isCollapsed ? item.label : undefined}
          >
            <Icon aria-hidden="true" />
            <span
              className={cn(
                styles.navigationCopy,
                isCollapsed && styles.collapsedOnlyHidden,
              )}
            >
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}
