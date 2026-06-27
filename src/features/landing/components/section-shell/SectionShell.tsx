import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { AppearingText } from "../appearing-text/AppearingText";
import { HologramFrame } from "../hologram-frame/HologramFrame";
import styles from "./SectionShell.module.css";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Sequential section number for the corner label (e.g. "02"). */
  index?: string;
  className?: string;
  children: ReactNode;
}

/**
 * One-shot scroll-reveal wrapper used by every landing section.
 * Uses IntersectionObserver — no library, no jank, respects reduced-motion.
 */
const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    { id, eyebrow, title, subtitle, index, className, children },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const node = innerRef.current;
      if (!node) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
              return;
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    const labelText = index ? `// ${index} · ${id}` : `// ${id}`;

    return (
      <section
        ref={ref}
        id={id}
        className={`${styles.section} ${className ?? ""}`}
      >
        <div className={styles.inner}>
          <div
            ref={innerRef}
            className={`${styles.reveal} ${visible ? styles.revealVisible : ""}`}
          >
            <HologramFrame label={labelText} corners>
              {(eyebrow || title || subtitle) && (
                <header className={styles.header}>
                  {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
                  {title && (
                    <h2 className={styles.title}>
                      <AppearingText stagger={0.05}>{title}</AppearingText>
                    </h2>
                  )}
                  {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </header>
              )}
              {children}
            </HologramFrame>
          </div>
        </div>
      </section>
    );
  },
);

export default SectionShell;
