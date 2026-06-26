import { useEffect, useRef } from "react";
import styles from "./HeroVideo3D.module.css";

interface HeroVideoFallbackProps {
  videoSrc: string | null;
  placeholderText: string;
}

/**
 * Pure CSS-3D card with pointer-driven tilt + the raw <video> playing inside.
 * Zero WebGL, smooth on any device. Used when 3D is not safe (reduced-motion,
 * no WebGL, low-power hardware).
 */
export function HeroVideoFallback({
  videoSrc,
  placeholderText,
}: HeroVideoFallbackProps) {
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
      // Tilt amplitude: ±8 deg X, ±10 deg Y
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

  return (
    <div className={styles.fallback}>
      <div ref={cardRef} className={styles.fallbackCard}>
        {videoSrc ? (
          <video
            className={styles.fallbackVideo}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Introduction video"
          />
        ) : (
          <div className={styles.fallbackPlaceholder}>{placeholderText}</div>
        )}
        <div className={styles.fallbackShade} aria-hidden="true" />
      </div>
    </div>
  );
}
