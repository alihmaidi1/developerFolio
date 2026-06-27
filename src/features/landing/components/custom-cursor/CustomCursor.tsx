import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

/**
 * Two-element custom cursor: a precise dot that tracks the mouse instantly
 * and an outer ring that trails with eased lerp. The ring inflates over
 * interactive elements ([data-cursor="hover"] or button/a/[role=button]).
 *
 * Hidden on touch devices, prefers-reduced-motion, and when the window loses
 * focus. Pure DOM transforms — no React re-renders.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringRef2 = useRef({ x: -100, y: -100 });
  const enabledRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reduced) {
      return;
    }

    document.body.dataset.customCursor = "on";
    enabledRef.current = true;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: PointerEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!ring.classList.contains(styles.visible)) {
        ring.classList.add(styles.visible);
        dot.classList.add(styles.visible);
      }
    };

    const onLeave = () => {
      ring.classList.remove(styles.visible);
      dot.classList.remove(styles.visible);
    };

    const onDown = () => {
      ring.classList.add(styles.pressed);
    };
    const onUp = () => {
      ring.classList.remove(styles.pressed);
    };

    const isInteractive = (target: Element | null): boolean => {
      if (!target) return false;
      const el = target.closest(
        '[data-cursor="hover"], button, a[href], [role="button"], input, textarea, select',
      );
      return el !== null;
    };

    const onOver = (e: PointerEvent) => {
      if (isInteractive(e.target as Element | null)) {
        ring.classList.add(styles.hover);
      } else {
        ring.classList.remove(styles.hover);
      }
    };

    const tick = () => {
      // Outer ring eases toward the target — gives the trailing feel.
      ringRef2.current.x += (targetRef.current.x - ringRef2.current.x) * 0.18;
      ringRef2.current.y += (targetRef.current.y - ringRef2.current.y) * 0.18;
      ring.style.transform = `translate3d(${ringRef2.current.x}px, ${ringRef2.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      delete document.body.dataset.customCursor;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
