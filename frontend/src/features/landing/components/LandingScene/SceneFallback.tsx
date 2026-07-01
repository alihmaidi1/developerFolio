import styles from "./LandingScene.module.css";

interface SceneFallbackProps {
  variant: "loading" | "unsupported" | "error";
}

const COPY: Record<SceneFallbackProps["variant"], { glyph: string; line1: string; line2: string }> = {
  loading: { glyph: "", line1: "", line2: "Loading scene" },
  unsupported: {
    glyph: "[ ]",
    line1: "3D preview unavailable",
    line2: "WebGL not supported in this browser",
  },
  error: {
    glyph: "!",
    line1: "Scene failed to load",
    line2: "Refresh to retry",
  },
};

export function SceneFallback({ variant }: SceneFallbackProps) {
  if (variant === "loading") {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <span>Loading scene</span>
      </div>
    );
  }
  const copy = COPY[variant];
  return (
    <div className={styles.fallback} role="status">
      <div className={styles.fallbackInner}>
        <span className={styles.fallbackGlyph}>{copy.glyph}</span>
        <strong style={{ color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
          {copy.line1}
        </strong>
        <span>{copy.line2}</span>
      </div>
    </div>
  );
}
