import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { BREAKPOINTS } from "../../utils/sizes";

const FLICKER_CHARACTER_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randomChar = () =>
  FLICKER_CHARACTER_POOL[
    Math.floor(Math.random() * FLICKER_CHARACTER_POOL.length)
  ];

export function AppearingText({
  text,
  steps,
  duration,
  className = "",
}: {
  text: string;
  steps: number;
  duration: number;
  className?: string;
}) {
  const shouldSkipAnimation = useMemo(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`).matches,
    [],
  );

  const [displayText, setDisplayText] = useState(() =>
    shouldSkipAnimation ? text : "",
  );
  const [prevText, setPrevText] = useState(text);

  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(shouldSkipAnimation ? text : "");
  }

  useEffect(() => {
    if (!text || shouldSkipAnimation) return;

    const totalSteps = Math.ceil(text.length / steps);
    const durationPerStep = duration / totalSteps;
    const timeline = gsap.timeline();

    for (let step = 0; step < totalSteps; step++) {
      const startIndex = step * steps;
      const progress = { value: 0 };
      timeline.to(progress, {
        value: 1,
        duration: durationPerStep,
        onUpdate: () => {
          const revealed = text.slice(0, startIndex);
          const remaining = text.length - startIndex;
          const flickerLength = Math.min(steps, remaining);
          const flicker = Array.from(
            { length: flickerLength },
            randomChar,
          ).join("");
          setDisplayText(revealed + flicker);
        },
        onComplete: () => setDisplayText(text),
      });
    }

    return () => {
      timeline.kill();
    };
  }, [duration, steps, text, shouldSkipAnimation]);

  return (
    <div className={["appearing-text", className].filter(Boolean).join(" ")}>
      <p
        className="appearing-text-value"
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
      <p
        className="appearing-text-clone"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
