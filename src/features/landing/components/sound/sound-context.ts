import { createContext, useContext } from "react";

export interface SoundAPI {
  enabled: boolean;
  toggle: () => void;
  playClick: () => void;
  playSoft: () => void;
}

export const SoundContext = createContext<SoundAPI | null>(null);

export function useSound(): SoundAPI {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      enabled: false,
      toggle: () => undefined,
      playClick: () => undefined,
      playSoft: () => undefined,
    };
  }
  return ctx;
}
