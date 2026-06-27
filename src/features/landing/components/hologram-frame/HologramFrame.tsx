import type { ReactNode } from "react";
import styles from "./HologramFrame.module.css";

interface HologramFrameProps {
  children: ReactNode;
  /** Show the L-shaped bracket corners (default true). */
  corners?: boolean;
  /** Tint a faint scanline overlay across the inside. */
  scanlines?: boolean;
  /** Tiny top-left identifier tag, e.g. "// 02 · projects". */
  label?: string;
  /** Tiny top-right pill, e.g. "ACTIVE". */
  tag?: string;
  /** Optional class hook for the outer element. */
  className?: string;
  /** "raised" adds a border + bg; "inset" leaves the parent's surface alone. */
  variant?: "raised" | "inset";
}

/**
 * Cyberpunk/holographic frame wrapper — bracket corners, optional scanlines,
 * tiny corner tags. Pure CSS, zero runtime cost.
 */
export function HologramFrame({
  children,
  corners = true,
  scanlines = false,
  label,
  tag,
  className,
  variant = "inset",
}: HologramFrameProps) {
  return (
    <div
      className={[
        styles.frame,
        styles[variant],
        corners ? styles.withCorners : "",
        scanlines ? styles.withScanlines : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <span className={styles.label}>{label}</span>}
      {tag && (
        <span className={styles.tag}>
          <span className={styles.tagDot} aria-hidden="true" />
          {tag}
        </span>
      )}

      {corners && (
        <>
          <span
            className={`${styles.corner} ${styles.cornerTL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerTR}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerBL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerBR}`}
            aria-hidden="true"
          />
        </>
      )}

      {scanlines && <span className={styles.scanlines} aria-hidden="true" />}

      <div className={styles.body}>{children}</div>
    </div>
  );
}
