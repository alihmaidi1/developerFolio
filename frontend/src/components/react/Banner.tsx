import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AppearingText } from "./AppearingText";

export function Banner({
  copy,
  size = "md",
  animated = false,
  className = "",
}: {
  copy: string;
  size?: "sm" | "md";
  animated?: boolean;
  className?: string;
}) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animated || !backgroundRef.current) return;
    gsap.fromTo(
      backgroundRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.45, ease: "power2.out" },
    );
  }, [animated, copy]);

  return (
    <div
      className={["banner", `banner-size-${size}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div ref={backgroundRef} className="banner-background" />
      <div className={["banner-copy", `banner-copy-size-${size}`].join(" ")}>
        {animated ? (
          <AppearingText text={copy} steps={2} duration={0.6} />
        ) : (
          <p className="banner-copy-value">{copy}</p>
        )}
      </div>
    </div>
  );
}
