import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AppearingText.module.css";

interface AppearingTextProps {
  children: string;
  /** Seconds between each word's start. Default 0.045s. */
  stagger?: number;
  /** Threshold for the IntersectionObserver. Default 0.2. */
  threshold?: number;
  /** Re-trigger every time element re-enters viewport (default false). */
  repeat?: boolean;
  className?: string;
}

/**
 * Splits text into per-word spans that fade up in stagger when the parent
 * enters the viewport. Falls back to instant render on reduced motion or
 * when IntersectionObserver isn't supported.
 *
 * Renders as a <span> — the caller picks the heading tag (h2, h3, p…) and
 * places <AppearingText> inside it.
 *
 * Accessible: the original string is exposed via aria-label; the animated
 * spans are aria-hidden.
 */
export function AppearingText({
  children,
  stagger = 0.045,
  threshold = 0.2,
  repeat = false,
  className,
}: AppearingTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  // Resolve "already visible" at mount time so the effect never needs to
  // setState synchronously for the reduced-motion / no-IO branches.
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return true;
    if (typeof IntersectionObserver === "undefined") return true;
    return false;
  });

  const tokens = useMemo(() => {
    type Entry =
      | { kind: "space"; token: string }
      | { kind: "word"; token: string; delay: number };

    // Pure reduce — no reassignment, no mutation across iterations.
    return children.split(/(\s+)/).reduce<{
      items: Entry[];
      wordCount: number;
    }>(
      (acc, token) => {
        if (/^\s+$/.test(token)) {
          return {
            items: [...acc.items, { kind: "space", token }],
            wordCount: acc.wordCount,
          };
        }
        return {
          items: [
            ...acc.items,
            { kind: "word", token, delay: acc.wordCount * stagger },
          ],
          wordCount: acc.wordCount + 1,
        };
      },
      { items: [], wordCount: 0 },
    ).items;
  }, [children, stagger]);

  useEffect(() => {
    if (visible && !repeat) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) observer.disconnect();
            return;
          }
        }
        if (repeat) setVisible(false);
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, repeat, visible]);

  const cls = `${styles.text} ${visible ? styles.visible : ""} ${className ?? ""}`;

  return (
    <span ref={containerRef} className={cls} aria-label={children}>
      <span className={styles.sr}>{children}</span>
      <span aria-hidden="true" className={styles.line}>
        {tokens.map((entry, i) => {
          if (entry.kind === "space") {
            return (
              <span key={`s-${i}`} className={styles.space}>
                {entry.token}
              </span>
            );
          }
          return (
            <span
              key={`w-${i}`}
              className={styles.word}
              style={{ "--delay": `${entry.delay}s` } as React.CSSProperties}
            >
              {entry.token}
            </span>
          );
        })}
      </span>
    </span>
  );
}
