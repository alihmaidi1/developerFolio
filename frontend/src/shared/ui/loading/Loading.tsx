import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";
import styles from "./Loading.module.css";

type LoadingVariant = "page" | "inline" | "overlay";

const logoPath =
  "M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14M28 4 5 17 28 28 51 17 28 4M53 20 30 31 30 56 53 44 53 20M40 42 33 35C33 35 32 34 33 33 34 32 35 33 36 34L36 34 43 41C44 42 44 42 43 43L35 51C35 51 34 52 33 51 32 50 33 49 33 49L40 42M16 42 23 35C23 35 24 34 23 33 22 32 21 33 20 34L13 41C12 42 12 42 13 43L21 51C21 51 22 52 23 51 24 50 23 49 23 49L16 42";

interface LoadingProps {
  className?: string;
  label?: string;
  progress?: number;
  showProgressTrack?: boolean;
  variant?: LoadingVariant;
  children?: ReactNode;
}

interface LoadingSpinnerProps {
  className?: string;
}

interface LoadingLogoProps {
  className?: string;
  progress?: number | null;
}

export function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <span
      className={[styles.spinner, styles.spinnerCompact, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}

export function LoadingLogo({ className = "", progress }: LoadingLogoProps) {
  const id = useId().replace(/:/g, "");
  const pathId = `${id}-loading-logo-path`;
  const maskId = `${id}-loading-logo-mask`;
  const safeProgress =
    typeof progress === "number" ? Math.min(Math.max(progress, 0), 1) : null;

  return (
    <svg
      className={[styles.logo, className].filter(Boolean).join(" ")}
      viewBox="0 0 56 61"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d={logoPath} />
      </defs>

      {safeProgress === null ? (
        <use href={`#${pathId}`} className={styles.logoPath} />
      ) : (
        <>
          <mask id={maskId}>
            <rect fill="black" height="61" width="61" />
            <rect
              className={styles.logoProgress}
              fill="white"
              height="61"
              style={{ transform: `scaleY(${safeProgress})` }}
              width="61"
            />
          </mask>
          <use href={`#${pathId}`} className={styles.logoPath} opacity="0.3" />
          <use
            href={`#${pathId}`}
            className={styles.logoPath}
            mask={`url(#${maskId})`}
          />
        </>
      )}
    </svg>
  );
}

export default function Loading({
  className = "",
  label = "Loading",
  progress,
  showProgressTrack = true,
  variant = "page",
  children,
}: LoadingProps) {
  const safeProgress =
    typeof progress === "number" ? Math.min(Math.max(progress, 0), 1) : null;
  const style =
    safeProgress === null
      ? undefined
      : ({
          "--loading-progress": `${safeProgress * 100}%`,
        } as CSSProperties);

  return (
    <div
      className={[styles.container, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-label={label}
      aria-live="polite"
      style={style}
    >
      <div className={styles.surface}>
        {children ?? <LoadingLogo progress={safeProgress} />}
        {safeProgress !== null && showProgressTrack ? (
          <span className={styles.progressTrack} aria-hidden="true">
            <span className={styles.progressBar} />
          </span>
        ) : null}
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
