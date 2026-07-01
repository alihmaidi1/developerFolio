import styles from "./HeroSection.module.css";

interface StatusBadgeProps {
  label: string;
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className={styles.badge} data-anim="hero-badge">
      <span className={styles.badgeDot} aria-hidden="true" />
      {label}
    </span>
  );
}
