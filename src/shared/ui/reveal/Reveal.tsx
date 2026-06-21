import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
  duration?: number;
  distance?: string;
}

function Reveal({ children, duration = 600 }: RevealProps) {
  const style: CSSProperties = {
    animation: `reveal-content ${duration}ms ease-out both`,
  };

  return <div style={style}>{children}</div>;
}

export const Fade = Reveal;
export const Slide = Reveal;
