import { AlertTriangle } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  href?: string;
  hrefLabel?: string;
  fullPage?: boolean;
  compact?: boolean;
  onAction?: () => void;
}

export function ErrorState({
  title,
  description,
  actionLabel,
  href,
  hrefLabel,
  fullPage = false,
  compact = false,
  onAction,
}: ErrorStateProps) {
  return (
    <section
      className={cn(
        styles.root,
        fullPage && styles.fullPage,
        compact && styles.compact,
      )}
      role="alert"
    >
      <AlertTriangle className={styles.icon} aria-hidden="true" />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {(onAction || href) && (
        <div className={styles.actions}>
          {onAction && actionLabel && (
            <button className={styles.action} type="button" onClick={onAction}>
              {actionLabel}
            </button>
          )}
          {href && hrefLabel && (
            <a className={styles.link} href={href}>
              {hrefLabel}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
