import { useEffect, useState } from "react";
import { SwipeUp } from "./icons";

export function ScrollIcon() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isTouchDevice] = useState(
    () =>
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0,
  );

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-icon-wrapper">
      {!hasScrolled ? (
        <div className="scroll-icon">
          {isTouchDevice ? (
            <SwipeUp className="scroll-icon-swipe-up" />
          ) : (
            <div className="scroll-icon-wheel" />
          )}
        </div>
      ) : null}
    </div>
  );
}
