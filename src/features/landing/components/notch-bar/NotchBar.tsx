import { useEffect, useState } from "react";
import { SoundToggle } from "../sound/SoundToggle";
import styles from "./NotchBar.module.css";

interface NotchBarProps {
  brand: string;
  status?: string;
  version?: string;
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Thin top HUD strip — sits above the navbar like a futuristic console banner.
 * Pulsing status dot, live clock (HH:mm), brand identifier, version pill.
 *
 * Clock updates once per minute (no jank, no scroll listeners).
 */
export function NotchBar({
  brand,
  status = "Available for projects",
  version = "v.2026",
}: NotchBarProps) {
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    // Align the first tick to the next minute boundary so updates feel "on time".
    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let interval = 0;
    const timeout = window.setTimeout(() => {
      setClock(formatClock(new Date()));
      interval = window.setInterval(() => {
        setClock(formatClock(new Date()));
      }, 60_000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.bar} role="status" aria-label="System status">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.statusLabel}>{status}</span>
        </div>

        <div className={styles.center}>
          <span className={styles.brand}>
            <span className={styles.brandBracket}>[</span>
            {brand}
            <span className={styles.brandBracket}>]</span>
          </span>
        </div>

        <div className={styles.right}>
          <span className={styles.clock} aria-label={`Local time ${clock}`}>
            <span className={styles.clockLabel}>SYS</span>
            <span className={styles.clockValue}>{clock}</span>
          </span>
          <SoundToggle />
          <span className={styles.version}>{version}</span>
        </div>
      </div>
    </div>
  );
}
