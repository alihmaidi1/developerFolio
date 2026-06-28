import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import type { Vector3 } from "three";
import { camera } from "../../three/core/camera";
import { sceneWeightsInOut } from "../../animations/scenes";
import { sizes } from "../../utils/sizes";

export function ProjectedElement({
  point,
  children,
}: {
  point: Vector3;
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lastTransform = useRef("");

  useEffect(() => {
    const updatePosition = () => {
      if (!wrapperRef.current) return;
      if (sceneWeightsInOut.about.in === 0 || sceneWeightsInOut.about.out === 1)
        return;

      const screenPos = sizes.isLandscape
        ? camera.project(point)
        : { x: 0, y: 0 };
      const transform = sizes.isLandscape
        ? `translate(${screenPos.x}px, ${screenPos.y}px)`
        : "translate(0px, 0px)";

      if (transform !== lastTransform.current) {
        wrapperRef.current.style.transform = transform;
        lastTransform.current = transform;
      }
    };

    gsap.ticker.add(updatePosition);
    return () => gsap.ticker.remove(updatePosition);
  }, [point]);

  return (
    <div ref={wrapperRef} className="projected-element">
      {children}
    </div>
  );
}
