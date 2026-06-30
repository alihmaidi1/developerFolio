import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/cn";
import styles from "../AdminLayout.module.css";

interface AdminBrandProps {
  isCollapsed: boolean;
}

export function AdminBrand({ isCollapsed }: AdminBrandProps) {
  return (
    <Link to="/admin" className={styles.brand}>
      <span className={styles.brandMark}>AH</span>
      <span
        className={cn(
          styles.brandCopy,
          isCollapsed && styles.collapsedOnlyHidden,
        )}
      >
        <strong className={styles.brandName}>Control</strong>
        <small>Admin workspace</small>
      </span>
    </Link>
  );
}
