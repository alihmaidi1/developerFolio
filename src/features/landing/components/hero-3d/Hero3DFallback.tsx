import { useEffect, useMemo, useRef } from "react";
import styles from "./Hero3D.module.css";

interface Hero3DFallbackProps {
  username: string;
  role: string;
  available: boolean;
}

/**
 * Pure CSS holographic ID card with pointer-driven tilt — no WebGL.
 * Used when 3D is not safe (reduced-motion, no WebGL, low-power hardware).
 */
export function Hero3DFallback({
  username,
  role,
  available,
}: Hero3DFallbackProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      targetRef.current.x = (py - 0.5) * -8;
      targetRef.current.y = (px - 0.5) * 10;
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(loop);
      }
    };

    const onLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * 0.08;
      c.y += (t.y - c.y) * 0.08;
      card.style.transform = `rotateX(${c.x.toFixed(2)}deg) rotateY(${c.y.toFixed(2)}deg)`;
      const stillMoving =
        Math.abs(t.x - c.x) > 0.05 || Math.abs(t.y - c.y) > 0.05;
      if (stillMoving) {
        frameRef.current = requestAnimationFrame(loop);
      } else {
        frameRef.current = 0;
      }
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    };
  }, []);

  const initials = useMemo(() => {
    const parts = username.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
    }
    return username.slice(0, 2).toUpperCase();
  }, [username]);

  const hashCode = useMemo(() => {
    let h = 0;
    for (let i = 0; i < username.length; i += 1) {
      h = ((h << 5) - h + username.charCodeAt(i)) | 0;
    }
    const hex = Math.abs(h)
      .toString(16)
      .toUpperCase()
      .padStart(6, "0")
      .slice(0, 6);
    return `0x${hex}`;
  }, [username]);

  return (
    <div className={styles.fallback}>
      <div ref={cardRef} className={styles.fallbackCard}>
        <span className={styles.fallbackStripe} aria-hidden="true" />

        <header className={styles.fallbackTop}>
          <span className={styles.fallbackChipLogo}>&lt;/&gt;</span>
          <span className={styles.fallbackChipVersion}>v.2026</span>
        </header>

        <div className={styles.fallbackBody}>
          <h2 className={styles.fallbackName}>{username.toUpperCase()}</h2>
          <p className={styles.fallbackRole}>{role.toUpperCase()}</p>

          <p className={styles.fallbackStatus}>
            <span className={styles.fallbackDot} aria-hidden="true" />
            {available ? "AVAILABLE FOR PROJECTS" : "PORTFOLIO // 2026"}
          </p>
        </div>

        <footer className={styles.fallbackMeta}>
          <span>ID · {initials}/2026</span>
          <span>{hashCode}</span>
        </footer>
      </div>
    </div>
  );
}
