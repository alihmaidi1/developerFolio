import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { resources } from "../utils/resources";
import { createSignal } from "../store/signal";

export const preloaderVisible = createSignal(true);

const INITIAL_PROGRESS = 0.25;
const DATA_WAIT_PROGRESS = 0.92;
const MIN_VISIBLE_MS = 650;
const EXIT_DELAY_SECONDS = 0.18;

export const usePreloader = (isBlocked = false) => {
  const startedAt = useRef(0);
  const hideCallRef = useRef<gsap.core.Tween | null>(null);
  const [assetProgress, setAssetProgress] = useState(() =>
    resources.isReady ? 1 : INITIAL_PROGRESS,
  );
  const [isVisible, setIsVisible] = useState(preloaderVisible.value);

  const progress = useMemo(() => {
    if (!isBlocked) return assetProgress;
    return Math.min(assetProgress, DATA_WAIT_PROGRESS);
  }, [assetProgress, isBlocked]);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  useEffect(() => {
    const onProgress = (newProgress: number) => {
      setAssetProgress(INITIAL_PROGRESS + newProgress * (1 - INITIAL_PROGRESS));
    };
    const onReady = () => setAssetProgress(1);

    resources.on("progress", onProgress);
    resources.on("ready", onReady);

    return () => {
      resources.off("progress", onProgress);
      resources.off("ready", onReady);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-loading", isVisible);
    preloaderVisible.value = isVisible;

    return () => {
      document.body.classList.remove("is-loading");
    };
  }, [isVisible]);

  useEffect(() => {
    if (progress < 1 || isBlocked || !isVisible) return;

    const elapsed = performance.now() - startedAt.current;
    const minVisibleDelay = Math.max(0, MIN_VISIBLE_MS - elapsed) / 1000;
    const delay = Math.max(EXIT_DELAY_SECONDS, minVisibleDelay);

    hideCallRef.current?.kill();
    hideCallRef.current = gsap.delayedCall(delay, () => {
      setIsVisible(false);
    });

    return () => {
      hideCallRef.current?.kill();
      hideCallRef.current = null;
    };
  }, [isBlocked, isVisible, progress]);

  useEffect(() => {
    return () => {
      hideCallRef.current?.kill();
      document.body.classList.remove("is-loading");
    };
  }, []);

  return { isVisible, progress };
};
