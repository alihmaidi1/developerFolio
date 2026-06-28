import { useEffect, useState } from "react";

export const useAgent = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
          navigator.maxTouchPoints > 0,
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { isTouch };
};
