import { useEffect, useState } from "react";
import gsap from "gsap";
import { resources } from "../utils/resources";
import { createSignal } from "../store/signal";

export const preloaderVisible = createSignal(true);

export const usePreloader = () => {
  const [progress, setProgress] = useState(0.25);

  useEffect(() => {
    const onProgress = (newProgress: number) => {
      setProgress(0.25 + newProgress * 0.75);
    };

    resources.on("progress", onProgress);
    return () => {
      resources.off("progress", onProgress);
    };
  }, []);

  useEffect(() => {
    const rect = document.querySelector(
      ".preloader-rect",
    ) as HTMLElement | null;
    const preloader = document.querySelector(
      ".preloader",
    ) as HTMLElement | null;

    if (rect) rect.style.transform = `scaleY(${progress})`;

    if (progress === 1) {
      gsap.delayedCall(0.2, () => {
        document.body.classList.remove("is-loading");
        preloader?.classList.add("preloader-hidden");
        preloaderVisible.value = false;
      });
    }
  }, [progress]);

  return { progress };
};
