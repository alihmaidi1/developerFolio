import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SoundContext, type SoundAPI } from "./sound-context";

const STORAGE_KEY = "ln:sound-enabled";

/**
 * Tiny procedural sound system using the Web Audio API — no audio files.
 * Two ticks: a sharp click (440Hz, 18ms decay) and a soft chime (660Hz,
 * 60ms decay) for hover-style feedback.
 *
 * Off by default. Listens to global pointerdown to play the click whenever
 * the target is an interactive element (button, anchor, [data-cursor]).
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const ensureContext = useCallback(() => {
    if (!enabled) return null;
    if (!ctxRef.current) {
      const Audio =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Audio) return null;
      const audio = new Audio();
      const master = audio.createGain();
      master.gain.value = 0.07;
      master.connect(audio.destination);
      ctxRef.current = audio;
      gainRef.current = master;
    }
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, [enabled]);

  const playClick = useCallback(() => {
    const audio = ensureContext();
    const gain = gainRef.current;
    if (!audio || !gain) return;
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const env = audio.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(840, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.04);
    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(1, now + 0.002);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(env).connect(gain);
    osc.start(now);
    osc.stop(now + 0.06);
  }, [ensureContext]);

  const playSoft = useCallback(() => {
    const audio = ensureContext();
    const gain = gainRef.current;
    if (!audio || !gain) return;
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const env = audio.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(720, now);
    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(0.5, now + 0.005);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(env).connect(gain);
    osc.start(now);
    osc.stop(now + 0.13);
  }, [ensureContext]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* localStorage blocked */
      }
      return next;
    });
  }, []);

  // Auto-play a click on global pointerdown over interactive elements.
  useEffect(() => {
    if (!enabled) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const interactive = target.closest(
        '[data-cursor="hover"], button, a[href], [role="button"]',
      );
      if (!interactive) return;
      // Sound the toggle itself plays its own confirmation, skip here.
      if (interactive.matches('[data-sound="toggle"]')) return;
      playClick();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [enabled, playClick]);

  // Tear down the audio context when sound goes off.
  useEffect(() => {
    if (enabled) return;
    const audio = ctxRef.current;
    if (audio) {
      void audio.close();
      ctxRef.current = null;
      gainRef.current = null;
    }
  }, [enabled]);

  const api = useMemo<SoundAPI>(
    () => ({ enabled, toggle, playClick, playSoft }),
    [enabled, toggle, playClick, playSoft],
  );

  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}
