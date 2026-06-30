import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import styles from "../AdminLayout.module.css";

interface AdminAccountPanelProps {
  email: string | undefined;
  isCollapsed: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export function AdminAccountPanel({
  email,
  isCollapsed,
  isLoggingOut,
  onLogout,
}: AdminAccountPanelProps) {
  return (
    <div className={styles.account}>
      <div className={styles.accountIdentity}>
        <span className={styles.accountAvatar} aria-hidden="true">
          A
        </span>
        <span
          className={cn(
            styles.accountCopy,
            isCollapsed && styles.collapsedOnlyHidden,
          )}
        >
          <small>Signed in as</small>
          <strong>{email}</strong>
        </span>
      </div>
      <button
        className={styles.logoutButton}
        type="button"
        onClick={onLogout}
        disabled={isLoggingOut}
      >
        <LogOut aria-hidden="true" />
        <span className={cn(isCollapsed && styles.collapsedOnlyHidden)}>
          {isLoggingOut ? "Signing out" : "Sign out"}
        </span>
      </button>
    </div>
  );
}
