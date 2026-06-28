import { useEffect } from "react";
import gsap from "gsap";
import { Howler } from "howler";
import {
  howlerUnlocked,
  setSoundsEnabled,
  soundsEnabled,
} from "../store/soundStore";
import { isFeatureEnabled } from "../utils/features";
import { sounds } from "../sounds/definitions/sounds";
import { getSoundsHowl } from "../sounds/utils/sounds";
import type { SoundKey } from "../sounds/types";

export const useHowler = (isTouch: boolean) => {
  useEffect(() => {
    if (!isFeatureEnabled("sounds")) return;

    const unlock = () => {
      if (howlerUnlocked.value || Howler.ctx.state !== "running") return;
      howlerUnlocked.value = true;
      const stored = window.localStorage.getItem("portfolio-soundsEnabled");
      setSoundsEnabled(!isTouch && (stored ? stored === "true" : true));
    };

    const tick = () => unlock();
    const handleVisibilityChange = () =>
      Howler.mute(document.visibilityState === "hidden");
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "KeyM" && !isTouch)
        setSoundsEnabled(!soundsEnabled.value);
    };

    Howler.volume(0);
    gsap.ticker.add(tick);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);

    if (!isTouch) {
      for (const sound of Object.keys(sounds) as SoundKey[]) {
        getSoundsHowl(sound)?.load();
      }
    }

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isTouch]);
};
