import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowRightLong } from "./icons";
import { useSignal } from "../../hooks/useSignal";
import { projectIdSignal } from "../../store/routeStore";

type CursorType = "circle-black" | "circle-white" | "arrow" | "arrow-external";

export function Cursor() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("circle-black");
  const projectId = useSignal(projectIdSignal);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      setVisible(true);
      const target = event.target as HTMLElement | null;
      const cursor = target
        ?.closest("[data-cursor]")
        ?.getAttribute("data-cursor") as CursorType | null;
      setCursorType(cursor ?? "circle-black");
    };
    const handleMouseLeave = () => setVisible(false);
    const tick = () => {
      const state = mouse.current;
      state.currentX += (state.x - state.currentX) * 0.18;
      state.currentY += (state.y - state.currentY) * 0.18;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={[
        "cursor-wrapper",
        projectId !== null ? `project-${projectId}` : "",
        visible ? "cursor-wrapper-visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="cursor-inner">
        <div
          className={[
            "cursor cursor-circle-black",
            cursorType === "circle-black" ? "cursor-active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <div
          className={[
            "cursor cursor-circle-white",
            cursorType === "circle-white" ? "cursor-active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <div
          className={[
            "cursor cursor-arrow",
            cursorType === "arrow" ? "cursor-active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ArrowRight className="cursor-arrow-icon" />
        </div>
        <div
          className={[
            "cursor cursor-arrow-external",
            cursorType === "arrow-external" ? "cursor-active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ArrowRightLong className="cursor-arrow-icon" />
        </div>
      </div>
    </div>
  );
}
