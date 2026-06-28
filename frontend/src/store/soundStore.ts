import { Howler } from "howler";
import { createSignal } from "./signal";

export const howlerUnlocked = createSignal(false);
export const soundsEnabled = createSignal(false);

Howler.volume(0);

export const setSoundsEnabled = (enabled: boolean) => {
  soundsEnabled.value = enabled;
  window.localStorage.setItem("portfolio-soundsEnabled", String(enabled));
  Howler.volume(enabled ? 1 : 0);
};
